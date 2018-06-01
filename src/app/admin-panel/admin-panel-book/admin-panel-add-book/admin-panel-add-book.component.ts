import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { BookService } from "../../../share/service/book.service";
import {Observable} from "rxjs/internal/Observable";
import {Category} from "../../../share/model/category.models";
import {CategoryService} from "../../../share/service/category.service";
import {PublisherService} from "../../../share/service/publisher.service";
import {Publisher} from "../../../share/model/publisher.models";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {LogService} from "../../../share/service/log-service.service";
import {UserService} from "../../../share/service/user.service";

@Component({
  selector: 'app-admin-panel-add-book',
  templateUrl: './admin-panel-add-book.component.html',
  styleUrls: ['./admin-panel-add-book.component.scss']
})
export class AdminPanelAddBookComponent implements OnInit {

  public formAdd: FormGroup;

  public categories: Observable<Category[]>;
  public publishers: Observable<Publisher[]>;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private categoryService: CategoryService,
    private publisherService: PublisherService,
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit() {

    this.formAdd = this.fb.group({
      idBook: [''],
      titleBook: ['', Validators.required],
      ISBN: [''],
      summary: [''],
      cover: null,
      price: [''],
      nbStock: ['', Validators.min(0)],
      personnalizedWord: [''],
      trends: [false],
      idCategory: [null, Validators.required],
      idPublisher: [null],
    });

    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories
    });
    this.publisherService.getAllPublishers().subscribe(publishers => {
      this.publishers = publishers
    });
  }

  onSubmit(): void {
    console.log(this.formAdd.value);
    this.bookService.add(this.formAdd.value).subscribe(res => {
      this.router.navigate(['/admin/livres']);
    }, (err: HttpErrorResponse) => {
      if (err.error.message === 'Token expired') {
        this.userService.logOutUser();
      } else if (err.error.message === "Forbidden access") {
        this.router.navigate(['/accueil']);
      } else {
        this.router.navigate(['/admin/livres']);
      }
    });
  }


  changeSelect(event, formControlName) {
    this.formAdd.get(formControlName).setValue(event.target.value);
  }

  changeFileInput(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formAdd.get('cover').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }
}

