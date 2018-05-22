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
}
