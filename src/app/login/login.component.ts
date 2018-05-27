import { Component, OnInit } from '@angular/core';
import {UserService} from "../share/service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLoginUserData : FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.formLoginUserData = this.fb.group({
      email: ['',Validators.required],
      password: ['', Validators.required]
      });
  }

  loginUser(){
    this.userService.login(this.formLoginUserData.value).subscribe(
      res => console.log(res),
      err => console.log(err))};
}
