import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../share/service/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public formRegister : FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
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
    console.log("clicked on submit");
    console.log(this.formRegister.value);
    this.userService.register(this.formRegister.value).subscribe();
    alert("Utilisateur créé");


  }
}

//this.myGroup = new FormGroup({ firstName: new FormControl() });
