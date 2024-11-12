import {Box, Button, Card, CardActions, CardContent, CardMedia, Rating, Tooltip, Typography} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {useNavigate} from "react-router-dom";
import {norwegianPrice} from "../utils/Localisation.ts";
import {CardItemProps, Product} from "../utils/types.ts";
import {useAddToCart} from "../utils/CartAction.ts";
import AddToCartSnackbar from "./AddToCartSnackbar.tsx";

const CardItem: React.FC<CardItemProps> = ({
                                               productId,
                                               productTitle,
                                               productDescription,
                                               price,
                                               productImage,
                                               rating,
                                               category
                                           }) => {

    const navigate = useNavigate();

    const sendToProduct = () => {
        navigate(`/product/${productId}`);
    };

    const {addToCart, snackbarOpen} = useAddToCart();

    const product: Product = {
        id: productId,
        title: productTitle,
        price: price,
        description: productDescription,
        category: category,
        image: productImage,
        rating: rating
    }

    const isClothingCategory = category === "men's clothing" || category === "women's clothing";

    const truncatedDescription = productDescription.length > 230
        ? productDescription.substring(0, 230) + '...'
        : productDescription;

    const truncatedTitle = productTitle.length > 24
        ? productTitle.substring(0, 24) + '...'
        : productTitle;

    return (
        <>
            <Card onClick={sendToProduct}>
                <CardMedia
                    sx={{height: 190}}
                    image={productImage}
                    title={productTitle}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {truncatedTitle}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary', flexGrow: 1}}>
                        {truncatedDescription}
                    </Typography>
                    <Tooltip title="Skriv omtale">
                        <Box sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Rating
                                name="Rating for product"
                                value={rating.rate}
                                onClick={() => window.location.href = "https://www.google.com"}
                            />
                            <Box sx={{ml: 2}}>
                                ({rating.count})
                            </Box>
                        </Box>
                    </Tooltip>
                </CardContent>

                <CardActions>
                    <Typography variant="h6" sx={{color: 'text.primary'}}>
                        {`${norwegianPrice(price)} NOK`}
                    </Typography>

                    <Button startIcon={<ShoppingCartIcon/>} variant="contained" color="primary"
                            onClick={(e) => {
                                if (isClothingCategory) {
                                    sendToProduct();
                                } else {
                                    e.stopPropagation();
                                    addToCart(product);
                                }
                            }}
                            size="small">Legg i handlekurv</Button>
                </CardActions>
            </Card>
            <AddToCartSnackbar open={snackbarOpen}/>
        </>
    );
};

export default CardItem;