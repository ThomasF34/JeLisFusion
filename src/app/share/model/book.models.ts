export interface Book {
  idBook: number;
  titleBook: string;
  ISBN: string;
  summary: string;
  srcImage: string;
  price: number;
  nbStock: number;
  personnalizedWord: string;
  trends: boolean;
  idCategory: number;
  idPublisher: number;
}
