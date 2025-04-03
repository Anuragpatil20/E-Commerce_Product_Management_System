import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductForm = () => {
    const [product, setProduct] = useState({ name: "", description: "", price: "", category: "", stock: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/products", product);
            alert("Product added successfully!");
            setProduct({ name: "", description: "", price: "", category: "", stock: "" });
            navigate("/"); // Navigate to product list
        } catch (error) {
            alert("Error adding product!");
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">Add a New Product</h2>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Name</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Description</label>
                    <textarea
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Product Description"
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Price</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Price in USD"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Category</label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Category"
                        value={product.category}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Stock</label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Stock Quantity"
                        value={product.stock}
                        onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
