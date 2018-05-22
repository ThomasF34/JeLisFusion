import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/internal/Observable";
import {Book} from "../share/model/book.models";
import {BookService} from "../share/service/book.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})

export class CatalogComponent implements OnInit{
  books: Observable<Book[]>;

  constructor(private bookService: BookService){}

  ngOnInit(){
    //When we initializate the catalog component, we'll try to load all book from DB
    console.log('Initilizing Catalog Component');
    this.bookService.getAllBooks().subscribe(books => {this.books = books});
  }

  
}
