import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/internal/Observable";
import {Book} from "../share/model/book.models";
import {BookService} from "../share/service/book.service";
import {Author} from "../share/model/author.models";


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})

export class CatalogComponent implements OnInit {
  books: Observable<Book[]>;
  categorie : string;

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    //When we initializate the catalog component, we'll try to load all book from DB
    console.log('Initilizing Catalog Component');
    this.bookService.getAllBooks().subscribe(books => {
      this.books = books;
      this.categorie = null;
    });
  }

  trimSummary(summary) {
    const list = summary.split(".");
    return list[0] + "." + list[1] + "." + list[2] + "...";
  }

  trier(categorie: string) {
    if(categorie === undefined){
      this.ngOnInit();
    } else {
      console.log('Asking for category ' + categorie);
      this.bookService.getBooksByCat(categorie).subscribe(books => {
        this.books = books;
        this.categorie = categorie;
      });
    }
  }


}
