import { Injectable } from '@angular/core';
import {User} from "../model/user.models";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User){
    return this.http.post<User>("api/user/register", user);
  }
}
