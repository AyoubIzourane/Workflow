import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../demo/service/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.html',
  styleUrls: ['../../../../../styles.scss']
})
export class UserDetailsComponent implements OnInit {
  user: any;

  constructor(
    private route: ActivatedRoute,
    private usersService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      const userIdNumber = Number(userId); // Convert string to number
      this.usersService.getUser(userIdNumber).subscribe(
        res => {
          this.user = res;
          this.user.age = this.calculateAge(this.user.dateOfBirth);
        },
        err => console.error(err)
      );
    }
  }
  calculateAge(dateOfBirth: string): number {
    const dob = new Date(dateOfBirth);
    const diffMs = Date.now() - dob.getTime();
    const ageDt = new Date(diffMs);

    return Math.abs(ageDt.getUTCFullYear() - 1970);
  }
}
