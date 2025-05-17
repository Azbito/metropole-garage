export interface Car {
    id: string;
    plate: string;
    model: string;
    primaryColor: string;
    secondaryColor: string;
    userId: string;
    damage: number;
    fuel: number;
    purchaseDate: Date | string;
}
