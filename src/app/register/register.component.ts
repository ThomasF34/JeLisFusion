import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../share/service/user.service";
import {Router} from "@angular/router";

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
      email : ['', Validators.required],
      admin : [0],
      registerDate :[null],
    });
  }

  onSubmit(): void{
    this.userService.register(this.formRegister.value).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this.router.navigate(['/accueil'])
      },
      error => {console.log(error)}
    );

  }
}

//this.myGroup = new FormGroup({ firstName: new FormControl() });
