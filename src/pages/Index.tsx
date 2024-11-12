import CardItem from "../components/CardItem.tsx";
import {useEffect, useState} from "react";
import {
    Box,
    Checkbox,
    FormControl,
    Grid,
    Grid2,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField
} from "@mui/material";
import {Product} from "../utils/types.ts";
import SearchIcon from '@mui/icons-material/Search';
import {fetchProducts} from "../utils/api.ts";
import {norwegianCategory} from "../utils/Localisation.ts";
import LoadingPage from "../common/LoadingPage.tsx";

const Index = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

    const handleCategoryChange = (event: any) => {
        const {value} = event.target;
        setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
    };

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            setError(null);

            const data = await fetchProducts();
            if (data) {
                setProducts(data);
            }
            setLoading(false);
        };
        loadProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        return matchesSearch && matchesCategory;
    });

    if (loading) return <LoadingPage/>;
    if (error) return <p>{error}</p>;

    return (
        <Box marginTop="12vh">
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                marginTop="5%"
                sx={{
                    gap: 2,
                    paddingRight: '5%',
                    paddingLeft: '5%',
                    flexDirection: {xs: 'column', sm: 'row'},
                    width: {xs: '100%', sm: 'auto'},
                }}
            >
                <FormControl sx={{width: {xs: '90%', sm: 300}}}>
                    <InputLabel id="category-select-label">Kategori</InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="category-select"
                        multiple
                        value={selectedCategories}
                        onChange={handleCategoryChange}
                        input={<OutlinedInput label="Kategori"/>}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                <Checkbox checked={selectedCategories.includes(category)}/>
                                <ListItemText primary={norwegianCategory(category)}/>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    variant="outlined"
                    placeholder="Søk etter produkter"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    sx={{
                        width: {xs: '90%', sm: isSearchFocused ? '400px' : '200px'},
                        transition: 'width 0.3s ease-in-out',
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Box display="flex" justifyContent="center" marginTop="2%" marginBottom="10%">
                <Grid2 container spacing={2} justifyContent="center">
                    {filteredProducts.map((product: Product) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={product.id}
                            sx={{display: 'flex', justifyContent: 'center'}} // Sentrer CardItem
                        >
                            <CardItem
                                productId={product.id}
                                productTitle={product.title}
                                productImage={product.image}
                                price={product.price}
                                productDescription={product.description}
                                rating={product.rating}
                                category={product.category}
                            />
                        </Grid>
                    ))}
                </Grid2>
            </Box>
        </Box>
    )

}

export default Index;