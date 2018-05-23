import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {Book} from "../model/book.models";

@Injectable({
  providedIn: 'root'
})

export class BookService {

  constructor(private http:HttpClient) { }

  public getAllBooks(): Observable<any> {
    console.log("Asking for books");
    return this.http.get<any>('/api/book/getAllBooks');
  }

  public getBook(bookID : number): Observable<Book>{
    console.log("Asking for a particular book");
    console.log('api/book/getBookByID/'+bookID);
    return this.http.get<any>('api/book/getBookByID/'+bookID);
  }
}
