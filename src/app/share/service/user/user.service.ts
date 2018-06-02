import { Injectable } from '@angular/core';
import {User} from "../../model/user.models";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {b} from "@angular/core/src/render3";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User){
    return this.http.post<any>("api/user/register", user);
  }

  login(user){
    return this.http.post<any>("api/user/login",user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logOutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('admin')
    this.router.navigate(['/accueil']);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getAdmin(){
    return this.http.get<any>('api/user/getAdmin');
  }

  getLoggedInInfo(){
    return this.http.get<any>('api/user/loggedInInfo');
  }

  isAdmin(): boolean {
    return (localStorage.getItem('admin') == '1');
  }
}
