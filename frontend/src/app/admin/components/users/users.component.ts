import { Component, OnInit } from '@angular/core';
import { User } from '../../../demo/interfaces/User';
import { Role } from '../../../demo/interfaces/Role';
import { MessageService, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from '../../../demo/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'; 
import autoTable from 'jspdf-autotable';

@Component({
  templateUrl: './users.component.html',
  providers: [MessageService]
})
export class UsersComponent implements OnInit {

  genders: SelectItem[] = [];
  roles: SelectItem[] = [];
  usersDialog: boolean = false;
  deleteUsersDialog: boolean = false;
  users: User[] = [];
  selectedUsers: User[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  user: User = {
    id: 0,
    email: '',
    password: '',
    role: Role.User
  };
  edit: boolean = false;
  exportName = 'users';
  exportColumns: any =[]

  constructor(
    private usersService: UserService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.getUsers();

    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.usersService.getUser(+params['id']) 
        .subscribe(
          res => {
            console.log(res);
            this.user = res;
            this.edit = true;
          },
          err => console.log(err)
        );
    }

    this.genderSelection();
    this.roleSelection();
    this.colsFilter();
  }

  openNew() {
    this.user = {
      id: 0,
      email: '',
      password: '',
      role: Role.User
    };
    this.submitted = false;
    this.usersDialog = true;
  }


  getUsers(): void {
    this.usersService.getUsers()
      .subscribe(
        res => {
          this.users = res;
        },
        err => console.log(err)
      );
  }

  viewUser(id: number): void {
    // Navigate to the user details page
    this.router.navigate(['/admin/users/userDetails', id]);
  }

  editUser(user: User) {
    this.user = { ...user }; // Copy the user data to the form object
    this.usersDialog = true; // Open the dialog for editing users
}


deleteUser(id: number): void {
  this.usersService.deleteUser(id)
    .subscribe(
      res => {
        console.log(res);
        // Reload the same route to fetch updated data
        this.location.replaceState('/admin/users');
        this.ngOnInit(); // Call ngOnInit to fetch updated data
        this.deleteUsersDialog = false; // Hide the dialog after successful deletion
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
      },
      err => console.log(err)
    );
}

deleteSelectedUsers() {
  this.deleteUsersDialog = true;
}


confirmDeleteUsers() {
  // Assuming deleteUser() method deletes multiple users at once
  for (const user of this.selectedUsers) {
      this.usersService.deleteUser(user.id)
          .subscribe(
              res => {
                  console.log(res);
                  // Assuming you want to remove deleted users from the UI
                  this.users = this.users.filter(u => u.id !== user.id);
              },
              err => console.log(err)
          );
  }
  // Clear selected users array after deletion
  this.selectedUsers = [];
  this.deleteUsersDialog = false;
}

  submitUser() {
    this.usersService.createUser(this.user)
      .subscribe(
        res => {
          console.log(res);
          // Reload the same route to fetch updated data
          this.location.replaceState('/admin/users');
          this.ngOnInit(); // Call ngOnInit to fetch updated data
          this.usersDialog = false; // Hide the dialog after successful submission
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'data saved for user', life: 3000 });
        },
        err => console.log(err)
      );
  }
  
  hideDialog() {
    this.usersDialog = false;
    this.submitted = false;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  genderSelection() {
    this.genders = [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' }
  ];
  }

  roleSelection() {
  this.roles = [
    { label: 'Admin', value: 'Admin' },
    { label: 'User', value: 'User' }
];
  }

  colsFilter() {
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'telephone', header: 'Telephone' },
      { field: 'role', header: 'Role' },
      { field: 'position', header: 'Position' }
    ];
    }
    

}
