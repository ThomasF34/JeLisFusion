import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../../../share/service/book.service";
import {Observable} from "rxjs/internal/Observable";
import {Author} from "../../../share/model/author.models";
import {Category} from "../../../share/model/category.models";
import {Book} from "../../../share/model/book.models";
import {Publisher} from "../../../share/model/publisher.models";
import {PublisherService} from "../../../share/service/publisher.service";
import {CategoryService} from "../../../share/service/category.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-panel-edit-book',
  templateUrl: './admin-panel-edit-book.component.html',
  styleUrls: ['./admin-panel-edit-book.component.scss']
})
export class AdminPanelEditBookComponent implements OnInit {

  public id: number;
  public book: Book;
  public authors: Observable<Author[]>;
  public formEdit : FormGroup;
  public categories : Observable<Category[]>;
  public publishers : Observable<Publisher[]>;


  constructor(private fb : FormBuilder, private route: ActivatedRoute, private bookService: BookService, private publisherService: PublisherService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.formEdit = this.fb.group({
      idBook: [''],
      titleBook: ['', Validators.required],
      ISBN: ['', Validators.required],
      summary: ['', Validators.required],
      srcImage: [null],
      price: ['', Validators.required],
      nbStock: ['', Validators.required],
      personnalizedWord: [''],
      trends: [false],
      idCategory: [null, Validators.required],
      idPublisher: [null, Validators.required],
    });



    this.id = parseInt(this.route.snapshot.paramMap.get('idBook'),0);
    console.log("ID : " + this.id);



    this.bookService.getBook(this.id).subscribe(book => {
      this.book = book;
      this.formEdit = this.fb.group({
        idBook: [book.idBook],
        titleBook: [book.titleBook, Validators.required],
        ISBN: [book.ISBN, Validators.required],
        summary: [book.summary, Validators.required],
        srcImage: [null],
        price: [book.price, Validators.required],
        nbStock: [book.nbStock, Validators.required],
        personnalizedWord: [book.personnalizedWord],
        trends: [book.trends],
        idCategory: [book.idCategory, Validators.required],
        idPublisher: [book.idPublisher, Validators.required],
      });
    });


    this.categoryService.getAllCategories().subscribe(categories => {this.categories = categories});
    this.publisherService.getAllPublishers().subscribe(publishers => {this.publishers = publishers});
  }

  onSubmit(): void{
    this.bookService.update(this.book).subscribe();
  }

  onDelete(): void{
    this.bookService.deleteWritten(this.book).subscribe();
    this.bookService.deleteBook(this.book).subscribe();

  }

  setTitle(event){
    this.book.titleBook = event.target.value;
  }

  setISBN(event){
    this.book.ISBN = event.target.value;
  }

  setSummary(event){
    this.book.summary = event.target.value;
  }

  setPrice(event){
    this.book.price = event.target.value;
  }

  setNbStock(event){
    this.book.nbStock = event.target.value;
  }

  setPersonnalizedWord(event){
    this.book.personnalizedWord = event.target.value;
  }

  setTrends(event){
    if(event.target.value == 0){
      event.target.value = 1;
    } else {
      event.target.value = 0;
    }
    this.book.trends = event.target.value;
  }

  setIdCategory(event){
    this.book.idCategory = event.target.value;
  }

  setIdPublisher(event){
    this.book.idPublisher = event.target.value;
  }
}

