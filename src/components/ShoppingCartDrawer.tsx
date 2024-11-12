import {Box, Button, List, Typography} from "@mui/material";
import ShoppingCartItem from "./ShoppingCartItem.tsx";
import {useEffect, useState} from "react";
import {CartItem, ShoppingCartDrawerProps} from "../utils/types.ts";
import {useCart} from "../utils/CartContext.tsx";
import {BagImage} from "../assets/LogoImage.tsx";
import {calculateTotalPrice} from "../utils/CartAction.ts";

const ShoppingCartDrawer: React.FC<ShoppingCartDrawerProps> = ({onClose}) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const {updateCartCount} = useCart();

    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem("cart") || "[]") as CartItem[];
        setCartItems(storedCart);
    }, []);

    const clearCart = () => {
        sessionStorage.removeItem("cart");
        setCartItems([]);
        updateCartCount();
    };

    const removeItem = (title: string, size?: string) => {
        const updatedCart = cartItems.filter(
            (item) => !(item.title === title && item.size === size)
        );
        setCartItems(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const checkout = () => {
        alert("Takk for handelen!");
        clearCart();
    };

    return (
        <Box sx={{width: 450}} role="presentation">
            <Typography variant="h5" sx={{textAlign: 'center', marginBottom: 1, marginTop: 2}}>
                Handlekurven
            </Typography>

            {cartItems.length > 0 ? (
                <>
                    <List sx={{marginTop: '5px'}}>
                        {cartItems.map((item, index) => (
                            <ShoppingCartItem
                                key={index}
                                title={item.title}
                                image={item.image}
                                quantity={item.quantity}
                                size={item.size}
                                price={item.price}
                                onDelete={() => removeItem(item.title, item.size)}
                            />
                        ))}
                    </List>

                    <Typography variant="h6" sx={{marginTop: 2, textAlign: 'right', marginRight: 2}}>
                        Total pris: {calculateTotalPrice(cartItems)} NOK
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 2,
                        marginLeft: 1,
                        marginRight: 1
                    }}>
                        <Button variant="outlined" color="error" onClick={clearCart}>
                            Tøm handlekurven
                        </Button>
                        <Button variant="contained" color="primary" onClick={checkout}>
                            Betal
                        </Button>
                    </Box>
                </>
            ) : (
                <Box sx={{textAlign: 'center', marginTop: 4}}>
                    <Box sx={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        flexGrow: 1
                    }}>
                        <img src={BagImage.bagImage} alt='Girl standing with clear shopping bag'
                        />
                    </Box>
                    <Typography variant="body1">Her er det tomt!</Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{marginTop: 2}}
                        onClick={onClose}
                    >
                        Begynn å handle!
                    </Button>
                </Box>
            )}
        </Box>
    );
}


export default ShoppingCartDrawer;

