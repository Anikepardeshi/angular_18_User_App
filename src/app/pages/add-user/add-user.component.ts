import { routes } from './../../app.routes';
import { CommonModule } from '@angular/common';
import { UserService } from './../../service/user.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, Routes } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule,RouterOutlet,CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {

addUserForm : FormGroup;
UserService = inject(UserService);
router = inject(Router);

constructor(private fb: FormBuilder) {
  this.addUserForm = this.fb.group({
    userName: ['', Validators.required],
    emailId: ['', [Validators.required, Validators.email]],
    fullName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
   // projectName: [''],
  });
}
addUser() {
  if (this.addUserForm.valid) {
    const formData = {
      ...this.addUserForm.value,
      role: 'user',
      refreshToken: null,
      refreshTokenExpiryTime: null,
      createdDate: new Date().toISOString(),
    };

    this.UserService.addNewUser(formData).subscribe((res: any) => {
      if (res.result= true) {
        alert('User added successfully');
        this.router.navigateByUrl('/login');
      } else {
        alert('Failed to add user: ' + res.message);
      }
    }, (error: any) => {
      alert('An error occurred while adding the user.');
    });
  } else {
    alert('Please fill in all the required fields.');
  }
}
}
