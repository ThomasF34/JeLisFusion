import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/internal/Observable";
import {Book} from "../share/model/book.models";
import {BookService} from "../share/service/book.service";


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})

export class CatalogComponent implements OnInit {
  books: Observable<Book[]>;
  category : string;

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    // When we initializate the catalog component, we'll try to load all book from DB
    console.log('Initilizing Catalog Component');
    this.bookService.getAllBooks().subscribe(books => {
      this.books = books;
      this.category = null;
    });
  }

  trimSummary(summary) {
    if(summary === undefined || summary === null){
      return summary;
    } else {
      const list = summary.split(".");
      if (list.length >= 3) {
        return list[0] + "." + list[1] + "." + list[2] + "...";
      } else {
        return summary;
      }
    }
  }

  trier(idCategory: number, stringCategory: string) {
    if (idCategory == 0) {
      this.ngOnInit();
    } else {
      console.log('Asking for category ' + idCategory);
      this.bookService.getBooksByCat(idCategory).subscribe(books => {
        this.books = books;
        this.category = stringCategory;
        console.log(idCategory);
        console.log(books);
      });
    }
  }

  sortSearchBar() {
    // Declare variables
    var input, filter, books, title, i;
    input = document.getElementById("inputSearch");
    filter = input.value.toUpperCase();
    books = document.getElementsByClassName("book");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < books.length; i++) {
      title = books[i].getElementsByClassName("titleBook")[0];
      if (title) {
        console.log(title.innerHTML);
        if (title.innerHTML.toUpperCase().indexOf(filter) > -1) {
          books[i].style.display = "";
        } else {
          books[i].style.display = "none";
        }
      }
    }
  }
}
