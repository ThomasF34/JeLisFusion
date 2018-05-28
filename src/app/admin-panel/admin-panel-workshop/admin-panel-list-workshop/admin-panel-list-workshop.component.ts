import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Workshop} from "../../../share/model/workshop.models";
import {WorkshopService} from "../../../share/service/workshop.service";

@Component({
  selector: 'app-admin-panel-list-workshop',
  templateUrl: './admin-panel-list-workshop.component.html',
  styleUrls: ['./admin-panel-list-workshop.component.scss']
})

export class AdminPanelListWorkshopComponent implements OnInit {

  public workshops: Observable<Workshop[]>;

  constructor(private workshopService: WorkshopService) { }

  ngOnInit() {
    this.workshopService.getAll().subscribe( workshops => {
      this.workshops = workshops})
  }

}
