import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();
    
    // State to store product details
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: ""
    });

    // Fetch product details on page load
    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${id}`)
            .then(res => {
                setProduct(res.data.name)
                setProduct(res.data.description)
                setProduct(res.data.price)
                setProduct(res.data.category)
                setProduct(res.data.stock)
                
                ;  // ✅ Set form data with fetched product
            })
            .catch(err => {
                console.error("Error fetching product:", err);
            });
    }, [id]); // ✅ Runs when 'id' changes

    // Handle input changes
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/products/${id}`, product);
            alert("Product updated successfully!");
            
            navigate("/"); // Redirect to product list
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" className="block w-full p-2 border mb-2" required />
                <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" className="block w-full p-2 border mb-2"></textarea>
                <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" className="block w-full p-2 border mb-2" required />
                <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" className="block w-full p-2 border mb-2" />
                <input type="number" name="stock" value={product.stock} onChange={handleChange} placeholder="Stock" className="block w-full p-2 border mb-2" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Product</button>
            </form>
        </div>
    );
};

export default EditProduct;
