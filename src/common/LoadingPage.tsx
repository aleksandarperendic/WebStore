import {Box, CircularProgress} from "@mui/material";

const LoadingPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh'
            }}
        >
            <CircularProgress size="3rem"/>
        </Box>
    )
}

export default LoadingPage;