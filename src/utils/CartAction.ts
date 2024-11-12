import {CartItem, Product} from "./types.ts";
import {useCart} from "./CartContext.tsx";
import {norwegianPrice} from "./Localisation.ts";
import {useState} from "react";

export const useAddToCart = () => {
    const {updateCartCount} = useCart();
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

    const addToCart = (product: Product, size?: string) => {
        if (!product) return;

        const cart = JSON.parse(sessionStorage.getItem("cart") || "[]") as CartItem[];

        const existingItemIndex = cart.findIndex((item) => {
            if (size) {
                return item.title === product.title && item.size === size;
            }
            return item.title === product.title && !item.size;
        });

        if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                title: product.title,
                image: product.image,
                quantity: 1,
                size: size || undefined,
                price: product.price,
            });
        }

        sessionStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        setSnackbarOpen(true);
        setTimeout(() => setSnackbarOpen(false), 3000);
    }
    return {addToCart, snackbarOpen};
};

export const calculateTotalPrice = (items: CartItem[]) => {
    return items.reduce((total, item) => total + parseFloat(norwegianPrice(item.price)) * item.quantity, 0).toFixed(2);
};
