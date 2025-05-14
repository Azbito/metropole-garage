interface Customizations {
    rims: string;
    spoiler: string;
    neon: boolean;
    performance: string;
}

export interface Car {
    plate: string;
    model: string;
    color: string;
    customizations: Customizations;
    owner: string;
    damage: number;
    fuel: number;
    locked: boolean;
    position: [number, number, number];
    purchaseDate: Date;
}
