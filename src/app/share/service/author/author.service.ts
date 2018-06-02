import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient} from "@angular/common/http";
import {Author} from "../../model/author.models";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  constructor(private http: HttpClient) { }

  public getAllAuthors(): Observable<any> {
    return this.http.get<any>('api/author/getAllAuthors');
  }

  add(author: Author) {
    return this.http.post<any>('api/author/create', author);
  }

  get(id : number){
    return this.http.get<any>('api/author/'+id);
  }

  update(author : Author){
    return this.http.put<any>('api/author/'+author.idAuthor+'/update', author);
  }

  deleteWritten(author: Author) {
    return this.http.delete<any>('api/author/'+author.idAuthor+'/deleteWritten');
  }


  deleteAuthor(author: Author) {
    return this.http.delete<any>('api/author/'+author.idAuthor+'/deleteAuthor');
  }
}
