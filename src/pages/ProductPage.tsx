import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Product} from "../utils/types.ts";
import {fetchProductById} from "../utils/api.ts";
import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Rating,
    Select,
    SelectChangeEvent,
    Tooltip,
    Typography
} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {norwegianCategory, norwegianPrice} from "../utils/Localisation.ts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {useAddToCart} from "../utils/CartAction.ts";
import LoadingPage from "../common/LoadingPage.tsx";
import AddToCartSnackbar from "../components/AddToCartSnackbar.tsx";

const ProductPage = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [size, setSize] = useState('');

    const {addToCart, snackbarOpen} = useAddToCart();

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true);
            setError(null);

            const data = await fetchProductById(id!);
            if (data) {
                setProduct(data);
            }
            setLoading(false);
        };
        loadProduct();
    }, [id]);

    const isClothingCategory = product?.category === "men's clothing" || product?.category === "women's clothing";

    const handleSizeChange = (event: SelectChangeEvent<string>) => {
        setSize(event.target.value);
    };

    const handleNavigate = () => {
        navigate(`/`);
    };

    if (loading) return <LoadingPage/>;
    if (error) return <p>{error}</p>;

    if (product)
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '85vh',
                    paddingX: '10%',
                    marginTop: "12vh"
                }}
            >
                <Paper
                    sx={{
                        width: "100%",
                        minHeight: "70vh",
                        padding: "2%",
                        paddingBottom: '20px',
                    }}
                >
                    <Tooltip title="Tilbake til hovedside">
                        <IconButton
                            size="large"
                            sx={{
                                left: 5,
                                p: 0
                            }}
                            onClick={handleNavigate}
                        >
                            <KeyboardBackspaceIcon
                                sx={{
                                    color: '#000b2e',
                                    width: '40px',
                                    height: '40px',
                                }}
                            />
                        </IconButton>
                    </Tooltip>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}
                              sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                              }}>
                            <Box
                                component="img"
                                sx={{
                                    width: "100%",
                                    maxWidth: 350,
                                    height: "auto",
                                    maxHeight: "100%",
                                    objectFit: "contain"
                                }}
                                alt="Product image"
                                src={product.image}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={8}
                            sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}
                        >
                            <Typography variant="h4">
                                {product.title}
                            </Typography>
                            <Typography sx={{marginBottom: '20px'}} variant="body1" color="primary" gutterBottom>
                                {norwegianCategory(product.category)}
                            </Typography>
                            <Typography variant="body2">
                                {product.description}
                            </Typography>

                            <Box sx={{marginBottom: '20px', marginTop: '20px'}}>
                                <Typography variant="body1">
                                    Hva sier våre kunder?
                                </Typography>
                                <Rating
                                    name="Rating for product"
                                    value={product.rating.rate}
                                    readOnly
                                />
                            </Box>

                            {isClothingCategory && (
                                <FormControl sx={{marginTop: 2, marginBottom: 15, width: {xs: '100%', md: '60%'}}}>
                                    <InputLabel>Velg størrelse</InputLabel>
                                    <Select
                                        variant="outlined"
                                        value={size}
                                        onChange={handleSizeChange}
                                        label="Velg størrelse"
                                    >
                                        <MenuItem value="XS">XS</MenuItem>
                                        <MenuItem value="S">S</MenuItem>
                                        <MenuItem value="M">M</MenuItem>
                                        <MenuItem value="L">L</MenuItem>
                                        <MenuItem value="XL">XL</MenuItem>
                                    </Select>
                                </FormControl>
                            )}

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}
                            >
                                <Typography variant="h5" sx={{color: 'text.primary'}}>
                                    {`${norwegianPrice(product.price)} NOK`}
                                </Typography>
                                <Button
                                    disabled={isClothingCategory && size === ''}
                                    startIcon={<ShoppingCartIcon/>}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={() => addToCart(product, size)}
                                >
                                    Legg i handlekurv
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
                <AddToCartSnackbar open={snackbarOpen}/>
            </Box>

        )

}
export default ProductPage;