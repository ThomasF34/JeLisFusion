import {Component, OnInit} from "@angular/core";
import {UserService} from "../share/service/user/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{

  public admin;

  constructor(public userService: UserService){}

  ngOnInit() {
    this.admin = localStorage.getItem('admin');
  }
}

