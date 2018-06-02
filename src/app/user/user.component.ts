import { Component, OnInit } from '@angular/core';
import {UserService} from "../share/service/user/user.service";
import {ParticipateService} from "../share/service/participate/participate.service";
import {ParticipateWithWorkshop} from "../share/model/participate.models";
import {User} from "../share/model/user.models";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public participates : ParticipateWithWorkshop[];
  public user: User;

  constructor(private userService : UserService,
              private participateService : ParticipateService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getLoggedInInfo().subscribe(user => {
      this.user = user;
      this.participateService.getAllParticipateFromUser(user.idUser).subscribe(participates => {
        this.participates = participates;
      });
    },
      (err: HttpErrorResponse) => {
        if (err.error.message === 'Token expired') {
          this.userService.logOutUser();
        } else if (err.error.message === "Forbidden access") {
          this.router.navigate(['/accueil']);
        } else {
          this.router.navigate(['/accueil']);
        }
      });
  }
}
