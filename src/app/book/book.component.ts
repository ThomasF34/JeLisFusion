import { Component, OnInit } from '@angular/core';
import {BookService} from "../share/service/book.service";
import {Observable} from "rxjs/internal/Observable";
import {Book} from "../share/model/book.models";
import {ActivatedRoute, Router} from "@angular/router";
import {Author} from "../share/model/author.models";
import {Category} from "../share/model/category.models";
import {Publisher} from "../share/model/publisher.models";
import {CategoryService} from "../share/service/category.service";
import {PublisherService} from "../share/service/publisher.service";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {


  public book: Book;
  public idBook: number;

  public fileURL;

  public authors: Observable<Author[]>;
  public category: Observable<Category>;
  public publisher: Observable<Publisher>;


  constructor(private route: ActivatedRoute, private bookService: BookService, private publisherService: PublisherService, private categoryService: CategoryService, private router: Router) {}

  ngOnInit() {
    console.log("Initializing Book Component");
    this.idBook = parseInt(this.route.snapshot.paramMap.get('idBook'), 0);
    this.bookService.getBook(this.idBook).subscribe(
      book => {
        this.getCategory(book.idCategory);
        this.getPublisher(book.idPublisher);
        const file = new Blob([ book.cover.value ], {
          type : 'image/jpeg'
        });
        this.fileURL = URL.createObjectURL(file);
        this.book = book},
      error => {
        this.router.navigate(['/accueil']);
      });
    this.bookService.getAuthors(this.idBook).subscribe( authors => {this.authors = authors});
  }

  getCategory(idCategory :number){
    this.categoryService.getCategory(idCategory).subscribe(category => {this.category = category});
  }

  getPublisher(idPublisher: number){
    this.publisherService.getPublisher(idPublisher).subscribe( publisher => {this.publisher = publisher});
  }
}
