export interface ICar {
  id?: string;
  plate: string;
  model: string;
  primaryColor: string;
  secondaryColor: string;
  damage: number;
  fuel: number;
  purchaseDate: string | Date;
  userId: string;
}
