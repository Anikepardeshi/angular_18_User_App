import { RouterLink } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  UserService = inject(UserService);
  userList : any[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.UserService.getUsers().subscribe((res: any) => {
      this.userList = res.data;
    });
  }

  onDelete(id : number){
    const isConfirmed = confirm('Are you sure you want to delete this user?');
    if(isConfirmed){
      this.UserService.deleteUserByUserId(id).subscribe((res: any) => {
        if(res.result){
          // alert('User deleted successfully');
          this.loadUsers();
        }else{
          alert('Failed to delete user: ' + res.message);
        }
      });
    }
  }

}
