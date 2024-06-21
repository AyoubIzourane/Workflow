import { Component, OnInit } from '@angular/core';
import { Workflow } from '../../../demo/interfaces/Workflow';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { WorkflowService } from '../../../demo/service/workflow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'; 
import autoTable from 'jspdf-autotable';
import { EntitePrimaireService } from 'src/app/demo/service/entitePrimaire.service';
import { EntitePrimaire } from 'src/app/demo/interfaces/EntitePrimaire';
import { VersionService } from 'src/app/demo/service/version.service';

@Component({
    templateUrl: './workflow.component.html',
    providers: [MessageService]
  })
  export class WorkflowComponent implements OnInit {
    status: SelectItem[] = [];
    workflowDialog: boolean = false;
    deleteWorkflowDialog: boolean = false;
    workflowList: Workflow[] = [];
    selectedWorkflowList: Workflow[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    workflow: Workflow = {
      id: 0
    };
    edit: boolean = false;
    exportName = 'workflow';
    exportColumns: any = [];
    entitePrimaires: SelectItem[] = [];
  
    constructor(
      private workflowService: WorkflowService,
      private versionService: VersionService,
      private entitePrimaireService : EntitePrimaireService,
      private messageService: MessageService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private location: Location
    ) {}
  
    ngOnInit() {
      this.getWorkflowList();
      this.loadEntitePrimaires();
      this.statusSelection();
  
      const params = this.activatedRoute.snapshot.params;
      if (params['id']) {
        this.workflowService.findOne(+params['id'])
          .subscribe(
            res => {
              this.workflow = res;
              this.edit = true;
            },
            err => console.log(err)
          );
      }
  
      this.colsFilter();
    }
  
    statusSelection() {
        this.status = [
          { label: 'Actif', value: 'Actif' },
          { label: 'Inactif', value: 'Inactif' }
      ];
      }

    openNew() {
      this.workflow = {
        id: 0
      };
      this.submitted = false;
      this.workflowDialog = true;
    }
  
    getWorkflowList(): void {
      this.workflowService.findAll()
        .subscribe(
          res => {
            this.workflowList = res;
          },
          err => console.log(err)
        );
    }
  
    editWorkflow(workflow: Workflow) {
      this.workflow = { ...workflow };
      this.workflowDialog = true;
    }
    
  
    updateStatus(workflow: Workflow) {
      const updatedWorkflow: Workflow = {
        ...workflow, 
        status: workflow.status
      };
    
      this.workflowService.update(workflow.id, updatedWorkflow).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Status updated successfully.' });
        },
        (error) => {
          console.error('Error updating status:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update status.' });
        }
      );
    }
  
  
    viewWorkflow(id: number | undefined): void {
      if (id !== undefined) {
        this.router.navigate(['/admin/workflow/workflowDetails', id]);
      }
    }
  
    deleteWorkflow(id: number): void {
      this.workflowService.delete(id)
        .subscribe(
          res => {
            this.location.replaceState('/admin/workflow');
            this.ngOnInit();
            this.deleteWorkflowDialog = false;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Workflow Deleted', life: 3000 });
          },
          err => console.log(err)
        );
    }
  
    deleteSelectedWorkflowList() {
      this.deleteWorkflowDialog = true;
    }
  
    confirmDeleteWorkflowList() {
      for (const workflow of this.selectedWorkflowList) {
        this.workflowService.delete(workflow.id)
          .subscribe(
            res => {
              this.workflowList = this.workflowList.filter(w => w.id !== workflow.id);
            },
            err => console.log(err)
          );
      }
      this.selectedWorkflowList = [];
      this.deleteWorkflowDialog = false;
    }
  
    submitWorkflow() {
      this.workflowService.create(this.workflow)
        .subscribe(
          res => {
            this.location.replaceState('/admin/workflow');
            this.ngOnInit();
            this.workflowDialog = false;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Workflow Saved', life: 3000 });
          },
          err => console.log(err)
        );
    }
  
    hideDialog() {
      this.workflowDialog = false;
      this.submitted = false;
    }
  
    colsFilter() {
      this.cols = [
        { field: 'titre', header: 'Title' },
        { field: 'prefixe', header: 'Prefix' },
        { field: 'status', header: 'Status' },
        { field: 'description', header: 'Description' },
        { field: 'default', header: 'Default' },
        { field: 'entitePrimaire', header: 'Entite Primaire' } // Display related entity field
      ];
    }
  
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    loadEntitePrimaires() {
        this.entitePrimaireService.findAll().subscribe(
          res => {
            this.entitePrimaires = res.map((entite: EntitePrimaire) => ({ label: entite.libelle, value: entite }));

          },
          err => console.log(err)
        );
      }

      gotoVersion(id: number) {
        this.router.navigate(['/admin/workflow/version', id]);
      }
      getDefaultVersionNumber(workflow: Workflow): number | undefined {
        const defaultVersion = workflow.versions?.find(v => v.default);
        return defaultVersion?.versionNumber;
    }

    getDefaultVersionId(workflow: Workflow): number | undefined {
      const defaultVersion = workflow.versions?.find(v => v.default);
      return defaultVersion?.id;
  }
    
    
  }