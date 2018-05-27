import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Publisher} from "../model/publisher.models";

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

}
