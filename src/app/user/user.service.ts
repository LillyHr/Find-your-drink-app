import { Injectable } from '@angular/core';
import { UserAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
user: UserAuth | undefined;
USER_KEY = '[user]';

  constructor(private http: HttpClient) { 
     try {
    const lsUser = localStorage.getItem(this.USER_KEY) || '';
    this.user = JSON.parse(lsUser);
  } catch (error) {
    this.user = undefined;
  } 
  }


  login(email: string, password: string) {
return this.http.post<UserAuth>('/api/login', { email, password })
  }

  register(
    username: string, 
    email: string,
    tel: string,
    password: string, 
    rePassword: string,
  ) {
    return this.http.post<UserAuth>('/api/register', { username, email, tel, password, rePassword })
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);
    this.user = undefined;
  }
}
