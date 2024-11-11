import CardItem from "../components/CardItem.tsx";
import {useEffect, useState} from "react";
import {Box, Grid, Grid2, InputAdornment, TextField} from "@mui/material";
import {Product} from "../utils/types.ts";
import SearchIcon from '@mui/icons-material/Search';

const Index = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");


    useEffect(() => {
        fetch("/api/products")
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(products);

    return (
        <>
            <Box display="flex" justifyContent="center" marginTop={"5%"}>
                <TextField
                    variant="outlined"
                    placeholder={"Søk etter produkter"}
                    value={searchTerm}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        },
                    }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{marginBottom: '2%'}}
                />
            </Box>
            <Box display="flex" justifyContent="center" marginTop={"2%"} marginBottom={"10%"}>

                <Grid2 container spacing={2} justifyContent="center">
                    {filteredProducts.map((product: Product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <CardItem
                                productTitle={product.title}
                                productImage={product.image}
                                price={product.price}
                                productDescription={product.description}
                                rating={product.rating}
                            />
                        </Grid>
                    ))}
                </Grid2>
            </Box>
        </>
    )

}

export default Index;