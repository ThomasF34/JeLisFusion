import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { UserService } from "./share/service/user/user.service";


@Injectable({
  providedIn: 'root'
})

export class AuthentGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate() : boolean{
    if(this.userService.loggedIn()){
      return this.userService.isAdmin();
    }else {
      this.router.navigate(['/connexion']);
      return false;
    }
  }

  /*canActivate() {
    return this.http.get('api/user/getAdmin');
    });
  }*/
}
