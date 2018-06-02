import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {Workshop} from "../../../share/model/workshop.models";
import {WorkshopService} from "../../../share/service/workshop/workshop.service";

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

  sortSearchBar() {
    // Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById("inputSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        console.log(td.innerHTML);
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}
