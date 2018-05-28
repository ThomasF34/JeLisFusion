import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WorkshopService} from "../../../share/service/workshop.service";

@Component({
  selector: 'app-admin-panel-add-workshop',
  templateUrl: './admin-panel-add-workshop.component.html',
  styleUrls: ['./admin-panel-add-workshop.component.scss']
})
export class AdminPanelAddWorkshopComponent implements OnInit {

  public formAdd : FormGroup;

  constructor(private fb : FormBuilder, private workshopService : WorkshopService) { }

  ngOnInit() {

    this.formAdd = this.fb.group({
      idWorkshop: [''],
      titleWorkshop: ['', Validators.required],
      dateWorkshop: [null],
      description: [''],
      nbSeat: [''],
      price: [''],
      minAge: [''],
      maxAge: [''],
      nameAnimator: ['']
    });
}

  onSubmit(): void{
    this.workshopService.add(this.formAdd.value).subscribe();
  }

  changeSelect(event, formControlName) {
    this.formAdd.get(formControlName).setValue(event.target.value);
  }
}

