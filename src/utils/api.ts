import {Product} from "./types.ts";

export const fetchProducts = async (): Promise<Product[] | null> => {
    try {
        const response = await fetch(`/api/products`);
        if (!response.ok) {
            console.error('Failed to fetch products:', response.statusText);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('An error occurred:', error);
        return null;
    }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
    try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
            console.error('Failed to fetch product:', response.statusText);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('An error occurred:', error);
        return null;
    }
};