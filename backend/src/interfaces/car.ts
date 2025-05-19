export interface ICar {
    id?: string;
    plate: string;
    model: string;
    primaryColor: string;
    secondaryColor: string;
    userId: string | null;
    damage: number;
    fuel: number;
}

export interface CreateCarInput {
    plate: string;
    model: string;
    primaryColor: string;
    secondaryColor: string;
    userId: string;
    damage: number;
    fuel: number;
    purchaseDate?: string;
}
