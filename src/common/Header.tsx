import {AppBar, Badge, Box, Container, Drawer, IconButton, Toolbar, Tooltip} from "@mui/material";
import {LogoImage} from "../assets/LogoImage.tsx";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useState} from "react";
import ShoppingCartDrawer from "../components/ShoppingCartDrawer.tsx";
import {useCart} from "../utils/CartContext.tsx";

const Header = () => {

    const navigate: NavigateFunction = useNavigate();
    const handleNavigate = () => {
        navigate(`/`);
    };
    const [openShoppingCart, setOpenShoppingCart] = useState<boolean>(false);

    const {cartCount} = useCart();

    return (
        <>
            <AppBar position="fixed" elevation={0}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{
                            marginTop: '10px',
                            marginBottom: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            flexGrow: 1
                        }}>
                            <img onClick={handleNavigate} src={LogoImage.logoImage} alt='Telenor Logo without text'
                                 width='65.125px' height='60px'/>
                        </Box>
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Vis handlekurven">
                                <IconButton
                                    sx={{
                                        p: 0,
                                        transition: 'transform 0.2s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                    onClick={() => setOpenShoppingCart(true)}
                                >
                                    <Badge badgeContent={cartCount > 0 ? cartCount : null} color="error">
                                        <ShoppingCartIcon
                                            sx={{
                                                color: '#fcfcfc',
                                                width: '30px',
                                                height: '30px',
                                            }}
                                        />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box>
                <Drawer anchor="right" open={openShoppingCart} sx={{zIndex: 1800}} onClose={() => setOpenShoppingCart(false)}>
                    <ShoppingCartDrawer onClose={() => setOpenShoppingCart(false)}/>
                </Drawer>
            </Box>
        </>
    )
        ;
}

export default Header;