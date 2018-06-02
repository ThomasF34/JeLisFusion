import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../share/service/user.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formRegister : FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }


  ngOnInit() {
    this.formRegister = this.fb.group({
      idUser : [''],
      nameUser : ['', Validators.required],
      fNameUser : ['', Validators.required],
      password : ['', Validators.required],
      email: ['',Validators.compose([Validators.required, Validators.email])],
      admin : [0],
      registerDate :[null],
    });
  }

  onSubmit(): void{
    this.userService.register(this.formRegister.value).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/accueil'])
      },
      error => {
        if(error instanceof HttpErrorResponse){
          if(error.status === 401){
            this.router.navigate(['/connexion'])
          }
        }
      }
    );

  }
}

//this.myGroup = new FormGroup({ firstName: new FormControl() });
