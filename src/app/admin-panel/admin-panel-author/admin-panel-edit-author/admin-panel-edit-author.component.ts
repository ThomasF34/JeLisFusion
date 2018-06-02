import { Component, OnInit } from '@angular/core';
import {Author} from "../../../share/model/author.models";
import {AuthorService} from "../../../share/service/author/author.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../share/service/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-panel-edit-author',
  templateUrl: './admin-panel-edit-author.component.html',
  styleUrls: ['./admin-panel-edit-author.component.scss']
})
export class AdminPanelEditAuthorComponent implements OnInit {

  public author : Author;
  public id : number;
  public formEdit : FormGroup;

  constructor(private authorService : AuthorService,
              private route : ActivatedRoute,
              private userService : UserService,
              private router : Router,
              private fb : FormBuilder) { }

  ngOnInit() {
    this.formEdit = this.fb.group({
      nameAuthor: ['', Validators.required],
      fNameAuthor: ['', Validators.required]
    });

    this.id = parseInt(this.route.snapshot.paramMap.get('idAuthor'),0);
    this.authorService.get(this.id).subscribe(author =>{
      this.author = author
      this.formEdit = this.fb.group({
        nameAuthor: [author.nameAuthor, Validators.required],
        fNameAuthor: [author.fNameAuthor, Validators.required]
      });
    }, (err: HttpErrorResponse) => {
        if (err.error.message === 'Token expired') {
          this.userService.logOutUser();
        } else if (err.error.message === "Forbidden access") {
          this.router.navigate(['/accueil']);
        } else {
          this.router.navigate(['/admin/auteur']);
        }
      });
  }

  setName(event){
    this.author.nameAuthor = event.target.value;
  }

  setfName(event){
    this.author.fNameAuthor = event.target.value;
  }

  onSubmit(){
    this.authorService.update(this.author).subscribe(res => {
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

  onDelete(): void{
    this.authorService.deleteWritten(this.author).subscribe();
    this.authorService.deleteAuthor(this.author).subscribe();
  }
}
