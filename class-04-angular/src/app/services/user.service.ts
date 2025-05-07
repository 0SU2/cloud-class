import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get(`${this.baseUrl}/users`);
  }

  createUser (user: any) {
    return this.http.post(`${this.baseUrl}/users/create`, user);
  }

  updateUser (id: string, user: any) {
    return this.http.put(`${this.baseUrl}/users/update/${id}`, user);
  }

  deleteUser (id: string) {
    return this.http.delete(`${this.baseUrl}/users/delete/${id}`);
  }

  unlockUser () {}

  getUserByUsername () {}
}
