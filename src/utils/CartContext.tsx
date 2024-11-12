import {createContext, useContext, useEffect, useState} from "react";
import {CartContextProps, CartItem, CartProviderProps} from "./types.ts";

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({children}) => {
    const [cartCount, setCartCount] = useState(0);

    const updateCartCount = () => {
        const cart = JSON.parse(sessionStorage.getItem("cart") || "[]") as CartItem[];
        const totalItems = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
        setCartCount(totalItems);
    };

    useEffect(() => {
        updateCartCount();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "cart") {
                updateCartCount();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <CartContext.Provider value={{cartCount, updateCartCount}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};