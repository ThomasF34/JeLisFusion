import { Component, OnInit } from '@angular/core';
import {UserService} from "../share/service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLoginUserData : FormGroup;
  isExpired : boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router) {

    this.logService.change.subscribe(isExpired => {
      this.isExpired = isExpired;
      console.log(this.isExpired);
    });
  }

  ngOnInit() {
    this.formLoginUserData = this.fb.group({
      email: ['',Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")])],
      password: ['', Validators.required]
      });
  }

  loginUser(){
    this.userService.login(this.formLoginUserData.value).subscribe(
      res => {
          localStorage.setItem('token', res.token)
          this.router.navigate(['/']);
        },
        err => {
          console.log(err) }
        )
  };

  show(){
    console.log(this.isExpired);
  }


}
