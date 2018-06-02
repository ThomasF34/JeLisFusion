import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Publisher} from "../../../share/model/publisher.models";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PublisherService} from "../../../share/service/publisher/publisher.service";
import {UserService} from "../../../share/service/user/user.service";

@Component({
  selector: 'app-admin-panel-edit-publisher',
  templateUrl: './admin-panel-edit-publisher.component.html',
  styleUrls: ['./admin-panel-edit-publisher.component.scss']
})
export class AdminPanelEditPublisherComponent implements OnInit {

  public publisher : Publisher;
  public id : number;
  public formEdit : FormGroup;

  constructor(private publisherService : PublisherService,
              private route : ActivatedRoute,
              private userService : UserService,
              private router : Router,
              private fb : FormBuilder) { }

  ngOnInit() {
    this.formEdit = this.fb.group({
    namePublisher: ['', Validators.required],
  });

    this.id = parseInt(this.route.snapshot.paramMap.get('idPublisher'),0);
    this.publisherService.get(this.id).subscribe(publisher =>{
      this.publisher = publisher;
      this.formEdit = this.fb.group({
        namePublisher: [publisher.namePublisher, Validators.required],
        fNamePublisher: [publisher.fNamePublisher, Validators.required]
      });
    }, (err: HttpErrorResponse) => {
      if (err.error.message === 'Token expired') {
        this.userService.logOutUser();
      } else if (err.error.message === "Forbidden access") {
        this.router.navigate(['/accueil']);
      } else {
        this.router.navigate(['/admin/editeur']);
      }
    });
  }
  setName(event){
    this.publisher.namePublisher = event.target.value;
  }

  onSubmit(){
    this.publisherService.update(this.publisher).subscribe(res => {
      this.router.navigate(['/admin/editeur']);
    }, (err: HttpErrorResponse) => {
      if (err.error.message === 'Token expired') {
        this.userService.logOutUser();
      } else if (err.error.message === "Forbidden access") {
        this.router.navigate(['/accueil']);
      } else {
        this.router.navigate(['/admin/editeur']);
      }
    });
  }

  onDelete(): void{
    this.publisherService.updateBook(this.publisher).subscribe( res => {
      this.publisherService.deletePublisher(this.publisher).subscribe()
    });
    ;
  }
}
