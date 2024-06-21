import { Component, OnInit } from '@angular/core';
import { User } from '../../../demo/interfaces/User';
import { Role } from '../../../demo/interfaces/Role';
import { MessageService, SelectItem } from 'primeng/api';
import { UserService } from '../../../demo/service/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './profile.component.html',
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {
  user: User = {
    id: 0,
    email: '',
    password: '',
    role: Role.User,
    gender: '',
  };

  genders: SelectItem[] = []; 


  constructor(
    private usersService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    this.genderSelection(); 
  }

  getCurrentUser(): void {
    this.usersService.getCurrentUser()
      .subscribe(
        res => {
          this.user = res;
        },
        err => console.log(err)
      );
  }

  onSubmit() {
    this.usersService.updateUser(this.user.id, this.user)
      .subscribe(
        res => {
          console.log(res);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Profile Updated', life: 3000 });
        },
        err => console.log(err)
      );
  }

  genderSelection() {
    this.genders = [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' }
    ];
  }

}
