import { Component, OnInit } from '@angular/core';
import {Workshop} from "../share/model/workshop.models";
import {WorkshopService} from "../share/service/workshop.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../share/service/user.service";
import {ParticipateService} from "../share/service/participate.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {Participate} from "../share/model/participate.models";

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss']
})
export class WorkshopComponent implements OnInit {


  public workshop: Workshop;
  public idWorkshop : number;
  public formParticipate : FormGroup;
  public remainingSeat : number;
  public participates : Participate[];

  constructor(
    private workshopService: WorkshopService,
    private route: ActivatedRoute,
    public userService: UserService,
    private participateService : ParticipateService,
    private fb : FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.formParticipate = this.fb.group({
      nbSeatToBook : [1, Validators.compose([Validators.max(this.remainingSeat), Validators.min(1), Validators.required])]
    });
    this.idWorkshop = parseInt(this.route.snapshot.paramMap.get('idWorkshop'), 0);
    this.workshopService.getWorkshop(this.idWorkshop).subscribe( workshop => {
      this.workshop = workshop;
      this.participateService.getTakenSeat(this.idWorkshop).subscribe( res => { this.remainingSeat = this.workshop.nbSeat - parseInt(res.toString())});
    });

    this.participateService.getAllParticipateFromWorkshop(this.idWorkshop).subscribe( participates => {
      this.participates = participates;
    })
  }

  onSubmit(){
    this.participateService.create(this.idWorkshop, this.formParticipate.get('nbSeatToBook').value).subscribe(res => {
      this.router.navigate(['/atelier']);
    }, (err: HttpErrorResponse) => {
      if (err.error.message === 'Token expired') {
        this.userService.logOutUser();
      } else if(err.error.message === "Already booked"){
        this.router.navigate(["/"]);
      } else if (err.error.message === 'Unauthorized request') {
        this.router.navigate(['/accueil']);
      } else {
        this.router.navigate(['/ateliers']);
      }
    });
  }

  parseInt(s : string) : number{
    return parseInt(s, 0);
  }
    /*public workshops: Observable<Workshop[]>;

    constructor(private workshopService: WorkshopService) { }

    ngOnInit() {
      this.workshopService.getAll().subscribe( workshops => {
        this.workshops = workshops})
    }
    */
}
