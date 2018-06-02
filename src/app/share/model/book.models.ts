export interface Book {
  idBook: number;
  titleBook: string;
  ISBN: string;
  summary: string;
  cover: File;
  price: number;
  nbStock: number;
  personnalizedWord: string;
  trends: boolean;
  idCategory: number;
  idPublisher: number;
  nameCategory: string;
}

