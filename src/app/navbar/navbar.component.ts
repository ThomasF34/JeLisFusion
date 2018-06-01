import {Component, OnInit} from "@angular/core";
import {UserService} from "../share/service/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{

  public admin = this.userService.getAdmin().subscribe(bool => { this.admin = bool; });

  constructor(private userService: UserService){}

  ngOnInit() {
  }

  redirectUserAccount(){

  }
}

