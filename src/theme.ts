import {createTheme, ThemeOptions} from "@mui/material";

export const theme: ThemeOptions = createTheme({
    palette: {
        primary: {
            main: '#1020f9',
            dark: '#070452',
            contrastText: '#ebffff',
        },
        secondary: {
            main: '#1020f9',
            contrastText: '#000b2e',
        },
        background: {
            default: '#fcfcfc',
        },
        divider: 'rgba(51,51,51,0.12)',
        text: {
            primary: '#293351',
        },
        info: {
            main: '#1020f9',
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#070452',
                    color: '#ebffff'
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 16
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: ({theme}) => ({
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 505,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.02)',
                        backgroundColor: theme.palette.background.default
                    },
                    borderRadius: '18px',
                    width: '100%',
                    maxWidth: 345,
                    [theme.breakpoints.down('sm')]: {
                        width: '80%',
                        maxWidth: '80%',
                    },
                }),
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                },
            },
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    justifyContent: 'space-between',
                    marginBottom: '5px',
                    marginLeft: '5px',
                    marginRight: '5px'
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 16
                },
            },
        }
    }
});