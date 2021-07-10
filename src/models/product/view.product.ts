export interface ViewProduct {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    category: string;
    isActive: boolean;
    price: number;
    photoIds: number[];
    photos: string[];
}