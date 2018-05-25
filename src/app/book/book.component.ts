import { Component, OnInit } from '@angular/core';
import {BookService} from "../share/service/book.service";
import {Observable} from "rxjs/internal/Observable";
import {Book} from "../share/model/book.models";
import {ActivatedRoute} from "@angular/router";
import {Author} from "../share/model/author.models";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  public book: Book;
  public id: number;
  public authors: Observable<Author[]>;


  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {
    console.log("Initializing Book Component");
    console.log(this.route.snapshot.paramMap);
    this.id = parseInt(this.route.snapshot.paramMap.get('idBook'), 0);
    console.log('Id: ' + this.id);
    this.bookService.getBook(this.id).subscribe(book => {this.book = book});
    this.bookService.getAuthors(this.id).subscribe( authors => {console.log(authors);this.authors = authors});
  }

}
