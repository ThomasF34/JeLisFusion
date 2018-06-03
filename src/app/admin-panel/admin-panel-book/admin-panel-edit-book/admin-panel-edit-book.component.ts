import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../../share/service/book/book.service";
import {Observable} from "rxjs/internal/Observable";
import {Author} from "../../../share/model/author.models";
import {Category} from "../../../share/model/category.models";
import {Book} from "../../../share/model/book.models";
import {Publisher} from "../../../share/model/publisher.models";
import {PublisherService} from "../../../share/service/publisher/publisher.service";
import {CategoryService} from "../../../share/service/category/category.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../share/service/user/user.service";

@Component({
  selector: 'app-admin-panel-edit-book',
  templateUrl: './admin-panel-edit-book.component.html',
  styleUrls: ['./admin-panel-edit-book.component.scss']
})
export class AdminPanelEditBookComponent implements OnInit {

  public id: number;
  public book: Book;
  public authorsOfBook: Author[];
  public authors : Author[];
  public formEdit : FormGroup;
  public categories : Observable<Category[]>;
  public publishers : Observable<Publisher[]>;


  constructor(
    private fb : FormBuilder,
    private route: ActivatedRoute,
    private bookService: BookService,
    private publisherService: PublisherService,
    private categoryService: CategoryService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.formEdit = this.fb.group({
      idBook: [''],
      titleBook: ['', Validators.required],
      ISBN: [''],
      summary: [''],
      srcImage: [null],
      price: [''],
      nbStock: ['', Validators.min(0)],
      personnalizedWord: [''],
      trends: [false],
      idCategory: [null, Validators.required],
      idPublisher: [null],
    });



    this.id = parseInt(this.route.snapshot.paramMap.get('idBook'),0);
    console.log("ID : " + this.id);

    this.bookService.getBook(this.id).subscribe(book => {
      this.book = book;
      this.formEdit = this.fb.group({
        idBook: [book.idBook],
        titleBook: [book.titleBook, Validators.required],
        ISBN: [book.ISBN],
        summary: [book.summary],
        srcImage: [null],
        price: [book.price],
        nbStock: [book.nbStock, Validators.min(0)],
        personnalizedWord: [book.personnalizedWord],
        trends: [book.trends],
        idCategory: [book.idCategory, Validators.required],
        idPublisher: [book.idPublisher],
      });
    }, (err: HttpErrorResponse) => {
      if (err.error.message === 'Token expired') {
        this.userService.logOutUser();
      } else if (err.error.message === "Forbidden access") {
        this.router.navigate(['/accueil']);
      } else {
        this.router.navigate(['/admin/livres']);
      }
    });

    this.bookService.getAuthors(this.id).subscribe( authors => {this.authorsOfBook = authors});
    this.bookService.getAllAuthors().subscribe( authors => {this.authors = authors});
    this.categoryService.getAllCategories().subscribe(categories => {this.categories = categories});
    this.publisherService.getAllPublishers().subscribe(publishers => {this.publishers = publishers});
  }

  onSubmit(): void{
    this.bookService.update(this.book).subscribe(res => {
      if(this.authorsOfBook.length !=0) {
        this.bookService.updateWritten(this.book, this.authorsOfBook).subscribe(res => {
          this.router.navigate(['/admin/livres']);
        }, (err: HttpErrorResponse) => {
          if (err.error.message === 'Token expired') {
            this.userService.logOutUser();
          } else if (err.error.message === "Forbidden access") {
            this.router.navigate(['/accueil']);
          } else {
            this.router.navigate(['/admin/livres']);
          }
        })
      } else {
        this.router.navigate(['/admin/livres'])
      }
    }, (err: HttpErrorResponse) => {
      if (err.error.message === 'Token expired') {
        this.userService.logOutUser();
      } else if (err.error.message === "Forbidden access") {
        this.router.navigate(['/accueil']);
      } else {
        this.router.navigate(['/admin/livres']);
      }
    });
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

  onAddAuthor(author){
    let found = false;
    this.authorsOfBook.forEach(function (aut) {
      if (author.idAuthor == aut.idAuthor) {
        found = true;
      }
    });
    if(!found){
      this.authorsOfBook.push(author);
    }
  }

  onRemoveAuthor(author){
    const index = this.authorsOfBook.indexOf(author);
    if( index > -1 ){
      console.log(index);
      this.authorsOfBook = this.authorsOfBook.filter(function(element){
        return element != author;
      });
    }
  }

  sortSearchBar() {
    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById("inputSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableAuthors");
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        console.log(td.innerHTML);
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}

