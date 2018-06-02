import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Publisher} from "../../model/publisher.models";

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http: HttpClient) { }

  public getAllPublishers(): Observable<any>{
    return this.http.get<any>('api/publisher/getAllPublishers');
  }

  public getPublisher(idPublisher: number): Observable<any>{
    return this.http.get<any>('api/publisher/'+idPublisher);
  }

  public add(publisher : Publisher){
    return this.http.post<any>('api/publisher/create', publisher);
  }

  get(id : number){
    return this.http.get<any>('api/publisher/'+id);
  }

  update(publisher : Publisher){
    return this.http.put<any>('api/publisher/'+ publisher.idPublisher +'/update', publisher);
  }

  updateBook(publisher: Publisher) {
    return this.http.put<any>('api/publisher/'+ publisher.idPublisher +'/updateBook', publisher);
  }

  deletePublisher(publisher: Publisher) {
    return this.http.delete<any>('api/publisher/'+ publisher.idPublisher +'/deletePublisher');
  }
}
