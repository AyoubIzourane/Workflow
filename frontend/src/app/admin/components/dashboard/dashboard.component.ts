import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../../../../src/service/app.layout.service';
import { WorkflowService } from 'src/app/demo/service/workflow.service';
import { Workflow } from 'src/app/demo/interfaces/Workflow';
import { UserService } from 'src/app/demo/service/user.service';
import { User } from 'src/app/demo/interfaces/User';
import { VersionService } from 'src/app/demo/service/version.service';
import { EntitePrimaireService } from 'src/app/demo/service/entitePrimaire.service';
import { EntitePrimaire } from 'src/app/demo/interfaces/EntitePrimaire';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];


    chartData: any;

    chartOptions: any;
    pieData: any;
    pieOptions: any;
    basicData: any;
    horizontalOptions: any;

    subscription!: Subscription;
    workflowCount: number = 0;
    activeWorkflows:number=0;
    inactiveWorkflows:number=0;
    brouillonWorkflows:number=0;
    userCount:number=0;
    entitePrimairecount:number=0;
    recentWorkflows: Workflow[] = [];

    constructor(
        private workflowService: WorkflowService,
        private versionService: VersionService,
        private userService: UserService,
        private entitePrimaireService: EntitePrimaireService,
        private router: Router, 
        public layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
        this.fetchWorkflowCount();
        this.fetchActiveWorkflows();
        this.fetchInactiveWorkflows();
        this.fetchBrouillonWorkflows();
        this.fetchUserCount();
        this.fetchEntitePrimaireCount();
        this.fetchRecentWorkflows();
        this.fetchWorkflowVersionCounts();

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        this.updatePieData();
    }

    updatePieData() {
        const documentStyle = getComputedStyle(document.documentElement);

        this.pieData = {
            labels: ['Actif', 'Inactif', 'Brouillon'],
            datasets: [
                {
                    data: [this.activeWorkflows, this.inactiveWorkflows, this.brouillonWorkflows],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--blue-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--red-400'),
                        documentStyle.getPropertyValue('--blue-400')
                    ]
                }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: documentStyle.getPropertyValue('--text-color')
                    }
                }
            }
        };
    }

    updateBarData(workflows: Workflow[]) {
        const workflowTitles = workflows.map(workflow => workflow.titre);
        const versionCounts = workflows.map(workflow => workflow.versions ? workflow.versions.length : 0);

        this.basicData = {
            labels: workflowTitles,
            datasets: [
                {
                    label: 'Version Count',
                    backgroundColor: '#42A5F5',
                    data: versionCounts
                }
            ]
        };

        this.horizontalOptions = {
            indexAxis: 'y',
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };
    }

    fetchWorkflowCount(): void {
        this.workflowService.findAll().subscribe(
          (workflows: Workflow[]) => {
            this.workflowCount = workflows.length;
          },
          error => {
            console.error('Error fetching workflow count', error);
          }
        );
    }

    fetchActiveWorkflows(): void {
        this.workflowService.findAll().subscribe(
          (workflows: Workflow[]) => {
            const wf =workflows.filter(workflow => workflow.status === 'Actif');
            this.activeWorkflows = wf.length;
            this.updatePieData(); 
          },
          error => {
            console.error('Error fetching active workflows', error);
          }
        );
      }
      
    fetchInactiveWorkflows(): void {
        this.workflowService.findAll().subscribe(
          (workflows: Workflow[]) => {
            const wf =workflows.filter(workflow => workflow.status === 'Inactif');
            this.inactiveWorkflows = wf.length;
            this.updatePieData(); 
          },
          error => {
            console.error('Error fetching inactive workflows', error);
          }
        );
      }

    fetchBrouillonWorkflows(): void {
        this.workflowService.findAll().subscribe(
          (workflows: Workflow[]) => {
            const wf =workflows.filter(workflow => workflow.status !== 'Actif' && workflow.status !== 'Inactif');
            this.brouillonWorkflows = wf.length;
            this.updatePieData(); 
          },
          error => {
            console.error('Error fetching brouillon workflows', error);
          }
        );
      }

    fetchUserCount(): void {
        this.userService.getUsers().subscribe(
          (user: User[]) => {
            this.userCount = user.length;
          },
          error => {
            console.error('Error fetching users count', error);
          }
        );
    }

    fetchEntitePrimaireCount(): void {
        this.entitePrimaireService.findAll().subscribe(
          (entitePrimaire: EntitePrimaire[]) => {
            this.entitePrimairecount = entitePrimaire.length;
          },
          error => {
            console.error('Error fetching entite primaire count', error);
          }
        );
    }

    fetchRecentWorkflows(): void {
        this.workflowService.findAll().subscribe(
            (workflows: Workflow[]) => {
                this.recentWorkflows = workflows
                    .filter(workflow => workflow.status === 'Actif')
                    .slice(0, 5); 
            },
            error => {
                console.error('Error fetching recent workflows', error);
            }
        );
    }

    fetchWorkflowVersionCounts(): void {
        this.workflowService.findAll().subscribe(
            (workflows: Workflow[]) => {
                this.updateBarData(workflows);
            },
            error => {
                console.error('Error fetching workflows', error);
            }
        );
    }

    viewWorkflow(id: number | undefined): void {
        if (id !== undefined) {
            this.router.navigate(['/admin/workflow/workflowDetails', id]);
        }
    }

    getDefaultVersionId(workflow: Workflow): number | undefined {
        const defaultVersion = workflow.versions?.find(version => version.default);
        return defaultVersion ? defaultVersion.id : undefined;
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
