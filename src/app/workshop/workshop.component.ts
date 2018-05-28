import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Workshop} from "../share/model/workshop.models";
import {WorkshopService} from "../share/service/workshop.service";

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss']
})
export class WorkshopComponent implements OnInit {

  public workshops: Observable<Workshop[]>;

  constructor(private workshopService: WorkshopService) { }

  ngOnInit() {
    this.workshopService.getAll().subscribe( workshops => {
      this.workshops = workshops})
  }

}
