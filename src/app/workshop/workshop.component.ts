import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Workshop} from "../share/model/workshop.models";
import {WorkshopService} from "../share/service/workshop.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../share/service/user.service";

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss']
})
export class WorkshopComponent implements OnInit {


  public workshop: Workshop;
  public idWorkshop : number;
  constructor(private workshopService: WorkshopService, private route: ActivatedRoute, public userService: UserService) { }

  ngOnInit() {
    this.idWorkshop = parseInt(this.route.snapshot.paramMap.get('idWorkshop'), 0);
    this.workshopService.getWorkshop(this.idWorkshop).subscribe( workshop => {
      this.workshop = workshop;
    });

  }

    /*public workshops: Observable<Workshop[]>;

    constructor(private workshopService: WorkshopService) { }

    ngOnInit() {
      this.workshopService.getAll().subscribe( workshops => {
        this.workshops = workshops})
    }
    */
}
