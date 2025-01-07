import { UserService } from './../../service/user.service';
import { Router, RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }

  UserService = inject(UserService);
  router = inject(Router)

  login() {

  this.UserService.onLogin(this.loginForm.value).subscribe((res : any) => {

     if(res.result){
       localStorage.setItem('taskApp', JSON.stringify(res.data));
       if(res.data.role === 'admin'){
        this.router.navigateByUrl('/user-list');
       }else{
        this.router.navigateByUrl('/add-user');
       }

     }else{
        alert(res.message);
     }
  });
}
}
