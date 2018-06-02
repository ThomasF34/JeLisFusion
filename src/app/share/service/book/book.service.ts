import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {Book} from "../../model/book.models";
import {Author} from "../../model/author.models";

@Injectable({
  providedIn: 'root'
})

export class BookService {

  constructor(private http: HttpClient) { }

  public getAllBooks(): Observable<any> {
    console.log("Asking for books");
    return this.http.get<any>('api/book/getAllBooks');
  }

  public getBook(bookID : number): Observable<any>{
    console.log("Asking for a particular book");
    console.log('api/book/getBookByID/'+bookID);
    return this.http.get<any>('api/book/getBookByID/'+bookID);
  }

  getBooksByCat(idCategory: number) {
    console.log("Asking for books in a category");
    console.log('api/book/cat/'+idCategory);
    return this.http.get<any>('api/book/cat/'+idCategory);
  }

  getAllAuthors(){
    return this.http.get<any>('api/author/getAllAuthors');
  }

  getAuthors(id: number) {
    console.log("Getting authors of book #"+ id);
    console.log('api/book/'+id+'/authors');
    return this.http.get<any>('api/book/'+id+'/authors');
  }

  add(book: Book) {
    return this.http.post<any>('api/book/add',book);
  }

  update(book: Book) {
    console.log("Updating book");
    return this.http.put('api/book/'+book.idBook+"/edit", book);
  }

  deleteWritten(book: Book) {
    console.log("Deleting written");
    return this.http.delete('api/book/'+book.idBook+"/deleteWritten");
  }

  deleteBook(book: Book) {
    console.log("Deleting book");
    return this.http.delete('api/book/'+book.idBook+"/deleteBook");
  }


  updateWritten(book, authorsOfBook: Author[]) {
    this.deleteWritten(book).subscribe();
    return this.http.post('api/book/addWritten', {idBook : book.idBook, authors : authorsOfBook});

  }
}
