import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleRetry = () => {
        navigate('/');
    };
  return (
      <Box
          sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '80vh',
              textAlign: 'center',
              padding: 2,
          }}
      >
          <Typography variant="h3" color="error" gutterBottom>
              Noe gikk galt...
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
              Vi klarte ikke å laste inn siden. Vennligst prøv igjen senere.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleRetry} sx={{ marginTop: 3 }}>
              Gå til startsiden
          </Button>
      </Box>
  )
}

export default ErrorPage;