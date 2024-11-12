import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./pages/Index.tsx";
import Header from "./common/Header.tsx";
import ProductPage from "./pages/ProductPage.tsx";

function App() {

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/product/:id" element={<ProductPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
