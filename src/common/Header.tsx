import {AppBar, Badge, Box, Container, IconButton, Toolbar, Tooltip} from "@mui/material";
import LogoImage from "../assets/LogoImage.tsx";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useNavigate} from "react-router-dom";

const Header = () => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/`);
    };

    return (
        <AppBar position="static" elevation={0}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        flexGrow: 1
                    }}>
                        <img onClick={handleNavigate} src={LogoImage.logoImage} alt='Telenor Logo without text' width='65.125px' height='60px'/>
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
                            >
                                <Badge badgeContent={17} color="error">
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
    );
}

export default Header;