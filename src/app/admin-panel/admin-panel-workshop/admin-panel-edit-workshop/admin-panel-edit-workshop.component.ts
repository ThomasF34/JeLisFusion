import { Component, OnInit } from '@angular/core';
import {WorkshopService} from "../../../share/service/workshop.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Workshop} from "../../../share/model/workshop.models";

@Component({
  selector: 'app-admin-panel-edit-workshop',
  templateUrl: './admin-panel-edit-workshop.component.html',
  styleUrls: ['./admin-panel-edit-workshop.component.scss']
})
export class AdminPanelEditWorkshopComponent implements OnInit {

  public formEdit: FormGroup;
  public id: number;
  public workshop : Workshop;
  public date : Date;

  constructor(private fb: FormBuilder, private workshopService: WorkshopService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.formEdit = this.fb.group({
      idWorkshop: [''],
      titleWorkshop: ['', Validators.required],
      dateWorkshop: [null, Validators.required],
      description: [''],
      nbSeat: [''],
      price: [''],
      minAge: [''],
      maxAge: [''],
      nameAnimator: ['']
    });

    this.id = parseInt(this.route.snapshot.paramMap.get('idWorkshop'),0);
    console.log("ID : " + this.id);

    this.workshopService.getWorkshop(this.id).subscribe( workshop => {
      console.log(workshop.dateWorkshop.toLocaleString());
      console.log(new Date(workshop.dateWorkshop).toLocaleString());
      console.log(new Date(workshop.dateWorkshop.toLocaleString()));
      this.workshop = workshop;
      this.formEdit = this.fb.group({
        idWorkshop: [workshop.idWorkshop],
        titleWorkshop: [workshop.titleWorkshop, Validators.required],
        dateWorkshop: [new Date(workshop.dateWorkshop.toLocaleString()), Validators.required],
        description: [workshop.description],
        nbSeat: [workshop.nbSeat],
        price: [workshop.price],
        minAge: [workshop.minAge],
        maxAge: [workshop.maxAge],
        nameAnimator: [workshop.nameAnimator]
      });
    })
  }


  onSubmit(): void{
    this.setDateWorkshop();
    this.workshopService.update(this.workshop).subscribe();
  }

  setTitleWorkshop(event){
    this.workshop.titleWorkshop = event.target.value;
  }

  setDateWorkshop(){
    this.workshop.dateWorkshop = new Date(this.formEdit.get('dateWorkshop').value).toLocaleString("fr-FR");
  }

  setDescription(event){
    this.workshop.description = event.target.value;
  }

  setNbSeat(event){
    this.workshop.nbSeat = event.target.value;
  }

  setPrice(event){
    this.workshop.price = event.target.value;
  }

  setMinAge(event){
    this.workshop.minAge = event.target.value;
  }

  setMaxAge(event){
    this.workshop.maxAge = event.target.value;
  }

  setNameAnimator(event){
    this.workshop.nameAnimator = event.target.value;
  }



}
