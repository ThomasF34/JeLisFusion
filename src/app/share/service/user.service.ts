import { Injectable } from '@angular/core';
import {User} from "../model/user.models";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";

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
    this.router.navigate(['/accueil']);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getAdmin(){
    return this.http.get<any>('api/user/getAdmin');
  }

}
