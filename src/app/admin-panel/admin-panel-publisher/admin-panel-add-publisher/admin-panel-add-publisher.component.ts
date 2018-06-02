import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PublisherService} from "../../../share/service/publisher/publisher.service";
import {Router} from "@angular/router";
import {UserService} from "../../../share/service/user/user.service";

@Component({
  selector: 'app-admin-panel-add-publisher',
  templateUrl: './admin-panel-add-publisher.component.html',
  styleUrls: ['./admin-panel-add-publisher.component.scss']
})
export class AdminPanelAddPublisherComponent implements OnInit {


  public formAdd : FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private publisherService : PublisherService,
              private userService : UserService) {}

  ngOnInit() {
    this.formAdd = this.fb.group({
      namePublisher: ['', Validators.required],
    });
  }

  onSubmit(): void {
    console.log(this.formAdd.value);
    this.publisherService.add(this.formAdd.value).subscribe(res => {
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

}
