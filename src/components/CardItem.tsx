import {Box, Button, Card, CardActions, CardContent, CardMedia, Rating, Tooltip, Typography} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface CardItemProps {
    productTitle: string;
    productDescription: string;
    price: number;
    productImage: string;
    rating: {
        rate: number,
        count: number
    }
}

const CardItem: React.FC<CardItemProps> = ({productTitle, productDescription, price, productImage, rating}) => {

    const truncatedDescription = productDescription.length > 230
        ? productDescription.substring(0, 230) + '...'
        : productDescription;

    const truncatedTitle = productTitle.length > 24
        ? productTitle.substring(0, 24) + '...'
        : productTitle;

    const adjustedPrice = (price * 11.08).toFixed(0);
    return (
        <Card onClick={() => window.location.href = "https://avinor.no"}>
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
                    {`${adjustedPrice} NOK`}
                </Typography>

                <Button startIcon={<ShoppingCartIcon/>} variant="contained" color="primary"
                        onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = "https://youtube.com";
                        }} size="small">Legg i
                    handlekurv</Button>
            </CardActions>
        </Card>
    );
};

export default CardItem;