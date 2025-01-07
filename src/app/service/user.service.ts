import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = '/api/TaskApp';

  constructor(private http : HttpClient) { }

  onLogin(obj: any) {
    return this.http.post(`${this.baseUrl}/login`, obj);
  }

  getUsers(){
    return this.http.get(`${this.baseUrl}/GetAllUsers`);
  }

  addNewUser(obj: any) {
    return this.http.post(`${this.baseUrl}/AddNewUser`, obj);
  }

  deleteUserByUserId(userId: number) {
    return this.http.delete(`${this.baseUrl}/DeleteUserByUserId?=`+userId);
  }
}
