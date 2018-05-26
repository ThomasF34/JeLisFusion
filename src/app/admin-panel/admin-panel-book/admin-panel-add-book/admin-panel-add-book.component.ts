import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { BookService } from "../../../share/service/book.service";
import {Observable} from "rxjs/internal/Observable";
import {Category} from "../../../share/model/category.models";
import {CategoryService} from "../../../share/service/category.service";

@Component({
  selector: 'app-admin-panel-add-book',
  templateUrl: './admin-panel-add-book.component.html',
  styleUrls: ['./admin-panel-add-book.component.scss']
})
export class AdminPanelAddBookComponent implements OnInit {

  public formAdd : FormGroup;
  public categories : Observable<Category[]>;

  constructor(private fb : FormBuilder, private bookService : BookService, private categoryService : CategoryService) { }

  ngOnInit() {

    this.formAdd = this.fb.group({
      idBook: [''],
      titleBook: ['', Validators.required],
      ISBN: ['', Validators.required],
      summary: ['', Validators.required],
      srcImage: ['', Validators.required],
      price: ['', Validators.required],
      nbStock: ['', Validators.required],
      personnalizedWord: ['', Validators.required],
      trends: [false, Validators.required],
      idCategory: [1],
      idPublisher: [1]
    });
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories});
  }

  onSubmit(): void{
    console.log("Clicked on submit");
    console.log(this.formAdd.value);
    alert(this.formAdd.value.titleBook);
    this.bookService.add(this.formAdd.value).subscribe();
    alert("Livre créé");
  }

  changeCategory(event) {
    this.formAdd.get('idCategory').setValue(event.target.value);
  }
}

