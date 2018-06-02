import { Component, OnInit } from '@angular/core';
import {Book} from "../share/model/book.models";
import {BookService} from "../share/service/book/book.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  book : Book;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getRandom().subscribe(book =>  {this.book = book});
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
}
