export interface ICar {
    id: string;
    plate: string;
    model: string;
    primaryColor: string;
    secondaryColor: string;
    damage: number;
    fuel: number;
    locked: boolean;
    purchaseDate: Date;
    userId: string | null;
}
