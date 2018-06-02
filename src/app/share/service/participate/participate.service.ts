import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ParticipateService {

  constructor(private http: HttpClient) { }

  getAllParticipateFromWorkshop(idWorkshop: number){
    return this.http.get<any>('api/participate/workshop/'+ idWorkshop);
  }

  getAllParticipateFromUser(idUser: number){
    return this.http.get<any>('api/participate/user/'+ idUser);
  }

  create(idWorkshop: number, nbSeatToBook: number){
    return this.http.post('api/participate/create', {idWorkshop, nbSeatToBook});
  }

  deleteFromWorkshop(idWorkshop: number){
    console.log("Atelier °" +idWorkshop);
    return this.http.delete('api/participate/deleteFromWorkshop/'+ idWorkshop);
  }

  deleteParticular(idWorkshop: number, idUser: number){
    return this.http.delete('api/participate/delete/workshop/'+ idWorkshop +'/user/'+ idUser);
  }

  getTakenSeat(id: number){
    return this.http.get('api/participate/takenSeat/'+ id);
  }
}
