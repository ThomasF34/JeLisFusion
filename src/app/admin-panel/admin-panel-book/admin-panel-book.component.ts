import { Component, OnInit } from '@angular/core';
import {BookService} from "../../share/service/book.service";
import {Observable} from "rxjs/internal/Observable";
import {Book} from "../../share/model/book.models";

@Component({
  selector: 'app-admin-panel-book',
  templateUrl: './admin-panel-book.component.html',
  styleUrls: ['./admin-panel-book.component.scss']
})
export class AdminPanelBookComponent implements OnInit {

  books: Observable<Book[]>;
  category : string;

  constructor(private bookService: BookService) {

  }

  ngOnInit() {
    //When we initializate the catalog component, we'll try to load all book from DB
    console.log('Initilizing Admin Panel Catalog Component');
    this.bookService.getAllBooks().subscribe(books => {
      this.books = books;
      this.category = null;
    });
  }


  trier(category: string) {
    if (category === undefined) {
      this.ngOnInit();
    } else {
      console.log('Asking for category ' + category);
      this.bookService.getBooksByCat(category).subscribe(books => {
        this.books = books;
        this.category = category;
      });
    }

  }

  sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.getElementsByTagName("TR");
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }


}
