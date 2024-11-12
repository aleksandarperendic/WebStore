import {Box, Divider, Grid, IconButton, Typography} from "@mui/material";
import {CartItem} from "../utils/types.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import {norwegianPrice} from "../utils/Localisation.ts";


const ShoppingCartItem: React.FC<CartItem> = ({title, image, quantity, price, size, onDelete}) => {
    const truncatedTitle = title.length > 18
        ? title.substring(0, 18) + '...'
        : title;

    const totalPrice = parseFloat(norwegianPrice(price)) * quantity;
    return (
        <>
            <Grid container spacing={2} alignItems="center" sx={{paddingY: 1}}>
                <Grid item xs={2} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Box
                        component="img"
                        src={image}
                        alt={title}
                        sx={{width: '60%', maxWidth: 80, height: 'auto', objectFit: 'contain'}}
                    />
                </Grid>

                <Grid item xs={5}>
                    <Typography variant="body1">{truncatedTitle}</Typography>
                    {size && (
                        <Typography variant="body2" color="textSecondary">
                            Størrelse: {size}
                        </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary">
                        Antall: {quantity}
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <Typography variant="body1">{`${totalPrice} NOK`}</Typography>
                </Grid>

                <Grid item xs={1} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <IconButton onClick={onDelete} color="error" aria-label="delete">
                        <DeleteIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            <Divider/>
        </>
    );
};

export default ShoppingCartItem;