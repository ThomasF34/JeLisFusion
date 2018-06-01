import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { UserService } from "./share/service/user.service";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class AuthentGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router, private http: HttpClient) {
  }

  canActivate() : boolean{
    if(this.userService.loggedIn()){
      console.log(this.userService.getAdmin().subscribe( bool => console.log(bool)));
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  /*canActivate() {
    return this.http.get('api/user/getAdmin');
    });
  }*/
}
