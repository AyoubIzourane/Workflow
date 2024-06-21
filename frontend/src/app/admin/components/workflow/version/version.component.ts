import { Component, OnInit } from '@angular/core';
import { Version } from '../../../../demo/interfaces/Version';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { VersionService } from '../../../../demo/service/version.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { WorkflowService } from 'src/app/demo/service/workflow.service';

@Component({
    templateUrl: './version.component.html',
    providers: [MessageService]
})
export class VersionComponent implements OnInit {
    status: SelectItem[] = [];
    versionDialog: boolean = false;
    deleteVersionDialog: boolean = false;
    versionList: Version[] = [];
    selectedVersionList: Version[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    version: Version = {
        id: 0,
        elements: [] ,
        nodes: [],
        links: [],
    };
    edit: boolean = false;
    exportName = 'version';
    exportColumns: any = [];
    workflowId: number | undefined;
    workflow: any;
    versions: Version[] = [];


    constructor(
        private versionService: VersionService,
        private messageService: MessageService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private location: Location,
        private route: ActivatedRoute,
        private workflowService: WorkflowService,
    ) {}

    ngOnInit() {
        const params = this.activatedRoute.snapshot.params;
        this.workflowId = +params['workflowId'];
    
        if (params['id']) {
            this.versionService.findOne(+params['id'])
                .subscribe(
                    res => {
                        this.version = res;
                        this.edit = true;
                    },
                    err => console.log(err)
                );
        }
        this.getVersionList(+params['id'] );
        this.statusSelection();
        this.colsFilter();
    }

    async submitVersion() {
        // Call getWorkflowId to fetch the workflow details
        await this.getWorkflowId();
    
        // Retrieve the latest version number
        const latestVersionNumber = this.versionList.reduce((max, v) => (v.versionNumber && v.versionNumber > max) ? v.versionNumber : max, 0);
    
        // Increment the latest version number by one
        this.version.versionNumber = latestVersionNumber + 1;
    
        // Ensure only one version is set as default
        this.versionList.forEach(v => {
            if (v.id === this.version.id) {
                v.default = true;
            } else {
                v.default = false;
            }
        });
    
        // Create the new version
        this.versionService.create(this.version)
            .subscribe(
                res => {
                    this.location.replaceState('/admin/version');
                    this.ngOnInit();
                    this.versionDialog = false;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Version Saved', life: 3000 });
                },
                err => console.log(err)
            );
    }
    
    
    async getWorkflowId() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            const detailsId = Number(id);
            try {
                const res: any = await this.workflowService.findOne(detailsId).toPromise();
                this.workflow = res;
                // Set the workflow ID
                this.version.workflow = { id: res.id };
            } catch (error) {
                console.error(error);
            }
        }
    }
    
    
    

    statusSelection() {
        this.status = [
            { label: 'Actif', value: 'Actif' },
            { label: 'Inactif', value: 'Inactif' }
        ];
    }

    openNew() {
        this.version = {
            id: 0,
            elements: [],
            nodes: [],
            links: [],
        };
        this.submitted = false;
        this.versionDialog = true;
    }

    getVersionList(workflowId: number): void {
        this.versionService.getVersionsByWorkflowId(workflowId)
            .subscribe(
                res => {
                    this.versionList = res;
                },
                err => console.log(err)
            );
    }
    setDefault(version: Version) {
        // Find all versions with the same workflow ID
        const versionsWithSameWorkflow = this.versionList.filter(v => v.workflow?.id === version.workflow?.id);
    
        // Ensure only one version is set as default among versions with the same workflow ID
        versionsWithSameWorkflow.forEach(v => {
            v.default = (v.id === version.id);
        });
    
        // Update the local list to reflect the changes
        this.versionList.forEach(v => {
            const updatedVersion: Version = {
                ...v
            };
            this.versionService.update(v.id, updatedVersion).subscribe(
                () => {},
                (error) => {
                    console.error('Error updating default value:', error);
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update default value.' });
                }
            );
        });
    }

    editVersion(version: Version) {
        this.version = { ...version };
        this.versionDialog = true;
    }

    viewVersion(id: number): void {
        this.router.navigate(['/admin/version/versionDetails', id]);
    }

    deleteVersion(id: number): void {
        this.versionService.delete(id)
            .subscribe(
                res => {
                    this.location.replaceState('/admin/version');
                    this.ngOnInit();
                    this.deleteVersionDialog = false;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Version Deleted', life: 3000 });
                },
                err => console.log(err)
            );
    }

    deleteSelectedVersionList() {
        this.deleteVersionDialog = true;
    }

    confirmDeleteVersionList() {
        for (const version of this.selectedVersionList) {
            this.versionService.delete(version.id)
                .subscribe(
                    res => {
                        this.versionList = this.versionList.filter(v => v.id !== version.id);
                    },
                    err => console.log(err)
                );
        }
        this.selectedVersionList = [];
        this.deleteVersionDialog = false;
    }

    hideDialog() {
        this.versionDialog = false;
        this.submitted = false;
    }

    colsFilter() {
        this.cols = [
            { field: 'titre', header: 'Title' },
            { field: 'status', header: 'Status' },
            { field: 'description', header: 'Description' },
            { field: 'createdAt', header: 'Created At' }
        ];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
