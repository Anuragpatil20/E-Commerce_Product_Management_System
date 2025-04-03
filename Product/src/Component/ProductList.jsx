import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                alert("Product deleted successfully!");
                fetchProducts(); // Refresh the list
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[url('http://www.pixelstalk.net/wp-content/uploads/2016/07/Free-1080p-Full-HD-Images-Screen.jpg')] bg-cover">
            {/* Header with Add Product Button */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-white ml-120">Product List</h1>
                <Link
                    to="/add"
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg transition duration-300 shadow-lg"
                >
                    <FiPlus size={20} /> Add Product
                </Link>
            </div>

            {/* Product Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                        >
                            {/* Product Image Placeholder */}
                            

                            <h2 className="text-xl font-semibold text-gray-900 truncate">{product.name}</h2>
                            <p className="text-gray-600 text-sm truncate">{product.description}</p>
                            <p className="text-green-500 font-bold text-lg mt-2">${product.price}</p>
                            <p className="text-gray-500 text-sm">Stock: {product.stock}</p>

                            {/* Buttons */}
                            <div className="mt-4 flex justify-between">
                                <Link
                                    to={`/update/${product._id}`}
                                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg transition duration-300"
                                >
                                    <FiEdit /> Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg transition duration-300"
                                >
                                    <FiTrash2 /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-center col-span-full">No products available.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
