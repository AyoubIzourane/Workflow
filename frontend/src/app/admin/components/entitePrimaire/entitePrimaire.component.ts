import { Component, OnInit } from '@angular/core';
import { EntitePrimaire } from '../../../demo/interfaces/EntitePrimaire';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { EntitePrimaireService } from '../../../demo/service/entitePrimaire.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'; 
import autoTable from 'jspdf-autotable';

@Component({
  templateUrl: './entitePrimaire.component.html',
  providers: [MessageService]
})
export class EntitePrimaireComponent implements OnInit {

  entitePrimaireDialog: boolean = false;
  deleteEntitePrimaireDialog: boolean = false;
  entitePrimaireList: EntitePrimaire[] = [];
  selectedEntitePrimaireList: EntitePrimaire[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  entitePrimaire: EntitePrimaire = {
    id: 0
  };
  edit: boolean = false;
  exportName = 'entitePrimaire';
  exportColumns: any =[];
  databaseEntity: string[] = [];
  databaseEntityOptions: SelectItem[] = [];


  constructor(
    private entitePrimaireService: EntitePrimaireService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getEntitePrimaireList();
    this.getDatabasesTables();

    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.entitePrimaireService.findOne(+params['id']) 
        .subscribe(
          res => {
            console.log(res);
            this.entitePrimaire = res;
            this.edit = true;
          },
          err => console.log(err)
        );
    }

    this.colsFilter();
  }

  openNew() {
    this.entitePrimaire = {
      id: 0
    };
    this.submitted = false;
    this.entitePrimaireDialog = true;
  }

  getEntitePrimaireList(): void {
    this.entitePrimaireService.findAll()
      .subscribe(
        res => {
          this.entitePrimaireList = res;
        },
        err => console.log(err)
      );
  }

  editEntitePrimaire(entitePrimaire: EntitePrimaire) {
    this.entitePrimaire = { ...entitePrimaire }; // Copy the data to the form object
    this.entitePrimaireDialog = true; // Open the dialog for editing
  }
  viewEntitePrimaire(id: number): void {
    // Navigate to the user details page
    this.router.navigate(['/admin/entitePrimaire/entitePrimaireDetails', id]);
  }

  deleteEntitePrimaire(id: number): void {
    this.entitePrimaireService.delete(id)
      .subscribe(
        res => {
          console.log(res);
          // Reload the same route to fetch updated data
          this.location.replaceState('/admin/entitePrimaire');
          this.ngOnInit(); // Call ngOnInit to fetch updated data
          this.deleteEntitePrimaireDialog = false; // Hide the dialog after successful deletion
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entite Primaire Deleted', life: 3000 });
        },
        err => console.log(err)
      );
  }

  deleteSelectedEntitePrimaireList() {
    this.deleteEntitePrimaireDialog = true;
  }

  confirmDeleteEntitePrimaireList() {
    // Assuming delete() method deletes multiple entities at once
    for (const entitePrimaire of this.selectedEntitePrimaireList) {
      this.entitePrimaireService.delete(entitePrimaire.id)
        .subscribe(
          res => {
            console.log(res);
            // Assuming you want to remove deleted entities from the UI
            this.entitePrimaireList = this.entitePrimaireList.filter(e => e.id !== entitePrimaire.id);
          },
          err => console.log(err)
        );
    }
    // Clear selected entities array after deletion
    this.selectedEntitePrimaireList = [];
    this.deleteEntitePrimaireDialog = false;
  }

  submitEntitePrimaire() {
    this.entitePrimaireService.create(this.entitePrimaire)
      .subscribe(
        res => {
          console.log(res);
          // Reload the same route to fetch updated data
          this.location.replaceState('/admin/entitePrimaire');
          this.ngOnInit(); // Call ngOnInit to fetch updated data
          this.entitePrimaireDialog = false; // Hide the dialog after successful submission
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Entite Primaire Saved', life: 3000 });
        },
        err => console.log(err)
      );
  }

  hideDialog() {
    this.entitePrimaireDialog = false;
    this.submitted = false;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  colsFilter() {
    this.cols = [
      { field: 'prefixe', header: 'Prefixe' },
      { field: 'libelle', header: 'Libelle' },
      { field: 'startwith', header: 'Start With' },
      { field: 'currentvalue', header: 'Current Value' },
      { field: 'databaseEntity', header: 'Database Entity' }
    ];
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getDatabasesTables(){
    this.entitePrimaireService.getDatabaseTables().subscribe(
      tables => {
        // Assign the fetched tables to databaseEntity
        this.entitePrimaire.databaseEntity = tables;
        // Populate dropdown options
        this.databaseEntityOptions = tables.map(table => ({ label: table, value: table }));
      },
      error => {
        console.error('Error fetching tables:', error);
      }
    );
  }
}
