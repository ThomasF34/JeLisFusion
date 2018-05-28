import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { BookService } from "../../../share/service/book.service";
import {Observable} from "rxjs/internal/Observable";
import {Category} from "../../../share/model/category.models";
import {CategoryService} from "../../../share/service/category.service";
import {PublisherService} from "../../../share/service/publisher.service";
import {Publisher} from "../../../share/model/publisher.models";

@Component({
  selector: 'app-admin-panel-add-book',
  templateUrl: './admin-panel-add-book.component.html',
  styleUrls: ['./admin-panel-add-book.component.scss']
})
export class AdminPanelAddBookComponent implements OnInit {

  public formAdd : FormGroup;



  public categories : Observable<Category[]>;
  public publishers : Observable<Publisher[]>;

  constructor(private fb : FormBuilder, private bookService : BookService, private categoryService : CategoryService, private publisherService: PublisherService) { }

  ngOnInit() {

    this.formAdd = this.fb.group({
      idBook: [''],
      titleBook: ['', Validators.required],
      ISBN: [''],
      summary: [''],
      srcImage: [null],
      price: [''],
      nbStock: [''],
      personnalizedWord: [''],
      trends: [false],
      idCategory: [null, Validators.required],
      idPublisher: [null],
    });

    this.categoryService.getAllCategories().subscribe(categories => {this.categories = categories});
    this.publisherService.getAllPublishers().subscribe(publishers => {this.publishers = publishers});
  }

  onSubmit(): void{
    this.bookService.add(this.formAdd.value).subscribe();
  }

  changeSelect(event, formControlName) {
    this.formAdd.get(formControlName).setValue(event.target.value);
  }
}

