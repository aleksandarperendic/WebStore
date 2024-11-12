import {Snackbar} from "@mui/material";
import {AddToCartSnackbarProps} from "../utils/types.ts";

const AddToCartSnackbar: React.FC<AddToCartSnackbarProps> = ({open}) => {
    return (
        <Snackbar
            sx={{
                position: 'fixed',
                right: {xs: '50%', sm: '16px'},
                bottom: {xs: '16px', sm: 'auto'},
                top: {xs: 'auto', sm: '70px'},
                transform: {xs: 'translateX(50%)', sm: 'none'},
                zIndex: 1300
            }}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={open}
            autoHideDuration={3000}
            message="Produktet ble lagt til i handlekurven"
        />
    );
};

export default AddToCartSnackbar;