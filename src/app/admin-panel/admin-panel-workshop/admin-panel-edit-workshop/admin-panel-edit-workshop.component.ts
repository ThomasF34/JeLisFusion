import { Component, OnInit } from '@angular/core';
import {WorkshopService} from "../../../share/service/workshop.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Workshop} from "../../../share/model/workshop.models";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../share/service/user.service";
import {ParticipateService} from "../../../share/service/participate.service";
import {Participate} from "../../../share/model/participate.models";

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
  public participates : Participate[];
  public remainingSeat : number;

  constructor(private fb: FormBuilder,
              private workshopService: WorkshopService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private participateService: ParticipateService) {
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
      this.participateService.getTakenSeat(this.id).subscribe( res => { console.log(res); this.remainingSeat = this.workshop.nbSeat - parseInt(res.toString())});
      this.participateService.getAllParticipateFromWorkshop(this.id).subscribe( participates => {
        this.participates = participates;
      })
    })
  }


  onSubmit(): void{
    this.setDateWorkshop();
    this.workshopService.update(this.workshop).subscribe(res => {
      this.router.navigate(['/admin/atelier']);
    }, (err: HttpErrorResponse) => {
      if (err.error.message === 'Token expired') {
        this.userService.logOutUser();
      } else if (err.error.message === "Forbidden access") {
        this.router.navigate(['/accueil']);
      } else {
        this.router.navigate(['/admin/atelier']);
      }
    });
  }

  onDelete(){
    this.participateService.deleteFromWorkshop(this.id).subscribe( res => {
        this.workshopService.delete(this.id).subscribe(res => {
          this.router.navigate(['/admin/atelier']);
        }, (err: HttpErrorResponse) => {
          if (err.error.message === 'Token expired') {
            this.userService.logOutUser();
          } else if (err.error.message === "Forbidden access") {
            this.router.navigate(['/accueil']);
          } else {
            this.router.navigate(['/admin/atelier']);
          }
        });
      },
      (err: HttpErrorResponse) => {
        if (err.error.message === 'Token expired') {
          this.userService.logOutUser();
        } else if (err.error.message === "Forbidden access") {
          this.router.navigate(['/accueil']);
        } else {
          this.router.navigate(['/admin/atelier']);
        }
      });
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
