export const norwegianCategory = (category: string) => {
    switch (category) {
        case 'electronics':
            return 'Elektronikk';
        case 'jewelery':
            return 'Smykker';
        case "men's clothing":
            return 'Herreklær';
        case "women's clothing":
            return 'Dameklær';
        default:
            return 'Ukjent kategori';
    }
};

export const norwegianPrice = (price: number) => (price * 11.08).toFixed(0);