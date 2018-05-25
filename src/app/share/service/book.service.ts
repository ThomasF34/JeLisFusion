import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class BookService {

  constructor(private http:HttpClient) { }

  public getAllBooks(): Observable<any> {
    console.log("Asking for books");
    return this.http.get<any>('/api/book/getAllBooks');
  }

  public getBook(bookID : number): Observable<any>{
    console.log("Asking for a particular book");
    console.log('api/book/getBookByID/'+bookID);
    return this.http.get<any>('api/book/getBookByID/'+bookID);
  }

  getBooksByCat(categorie: string) {
    console.log("Asking for books in a category");
    console.log('api/book/cat/'+categorie);
    return this.http.get<any>('api/book/cat/'+categorie);
  }

  getAuthors(id: number) {
    console.log("Getting authors of book #"+ id);
    console.log('api/book/'+id+'/authors');
    return this.http.get<any>('api/book/'+id+'/authors');

  }
}
