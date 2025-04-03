import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProductFrom from './Component/ProductForm'
import ProductList from './Component/ProductList'
import EditProduct from "./Component/EditProduct";

function App() {
    return (
       <BrowserRouter>
       <Routes>
       <Route path="/" element={<ProductList />} />
       <Route path="/add" element={<ProductFrom />} />
       <Route path="/update/:id" element={<EditProduct />} />
       </Routes>
       </BrowserRouter>
    );
}

export default App;
