import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthorService} from "../../../share/service/author/author.service";
import {UserService} from "../../../share/service/user/user.service";

@Component({
  selector: 'app-admin-panel-add-author',
  templateUrl: './admin-panel-add-author.component.html',
  styleUrls: ['./admin-panel-add-author.component.scss']
})
export class AdminPanelAddAuthorComponent implements OnInit {

  public formAdd : FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authorService : AuthorService,
              private userService : UserService) { }

  ngOnInit() {
    this.formAdd = this.fb.group({
      nameAuthor: ['', Validators.required],
      fNameAuthor: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log(this.formAdd.value);
    this.authorService.add(this.formAdd.value).subscribe(res => {
      this.router.navigate(['/admin/auteurs']);
    }, (err: HttpErrorResponse) => {
      if (err.error.message === 'Token expired') {
        this.userService.logOutUser();
      } else if (err.error.message === "Forbidden access") {
        this.router.navigate(['/accueil']);
      } else {
        this.router.navigate(['/admin/auteurs']);
      }
    });
  }
}
