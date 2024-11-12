import {ReactNode} from "react";

export interface Rating {
    rate: number;
    count: number;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
}

export interface CartItem {
    title: string;
    image: string;
    size?: string;
    quantity: number;
    price: number;
    onDelete?: () => void;
}

export interface CartContextProps {
    cartCount: number;
    updateCartCount: () => void;
}

export interface CartProviderProps {
    children: ReactNode;
}

export interface ShoppingCartDrawerProps {
    onClose: () => void;
}

export interface CardItemProps {
    productId: number;
    productTitle: string;
    productDescription: string;
    price: number;
    productImage: string;
    rating: {
        rate: number,
        count: number
    }
    category: string;
}


export interface AddToCartSnackbarProps {
    open: boolean;
}