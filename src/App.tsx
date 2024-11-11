import {BrowserRouter, Route, Routes} from "react-router-dom";
import Index from "./pages/Index.tsx";
import Header from "./common/Header.tsx";

function App() {

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Index/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
