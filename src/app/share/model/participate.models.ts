export interface Participate{
  idWorkshop : number;
  idUser : number;
  nbSeat: number;
  nameUser: string;
  fNameUser: string;
}

export interface ParticipateWithWorkshop{
  idWorkshop: number;
  idUser: number;
  nbSeat: number;
  titleWorkshop: string;
  dateWorkshop: string;
  price: number;
}
