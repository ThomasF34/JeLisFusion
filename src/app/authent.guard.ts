import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from "./share/service/user.service";

@Injectable({
  providedIn: 'root'
})

export class AuthentGuard implements CanActivate {
  constructor(private userService: UserService, private router : Router){}

  canActivate() : boolean{
    if(this.userService.loggedIn()){
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
