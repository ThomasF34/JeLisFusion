import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ParticipateService {

  constructor(private http: HttpClient) { }

  getAllParticipateFromWorkshop(idWorkshop: number){
    return this.http.get<any>('api/participate/workshop/'+idWorkshop);
  }

  getAllParticipateFromUser(idUser: number){
    return this.http.get<any>('api/participate/user/'+idUser);
  }
}
