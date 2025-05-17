export interface ICar {
    id?: string;
    plate: string;
    model: string;
    primaryColor: string;
    secondaryColor: string;
    userId: string | null;
    damage: number;
    fuel: number;
    x?: number;
    y?: number;
    z?: number;
}
