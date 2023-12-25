import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const CreatePage = () => {

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveProduct = async(e) => {
        e.preventDefault();
        if(name === "" || quantity === "" || price === "" || image == ""){
            toast.error('Please fill out all input completely');
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.post("https://basic-fullstack-backend.onrender.com/api/products", {name: name, quantiy: quantity, price: price, image: image});
            toast.success(`Save ${response.data.name} Successfully`);
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }


    return (
        <div className="max-w-lg mx-auto mt-6 bg-white rounded shadow-lg p-7">
            <h2 className="block mb-4 text-2xl font-semibold text-center">
                Create a Product
            </h2>
            <form onSubmit={saveProduct}>
                <div className="space-y-2">
                    <div>
                        <label className="block mb-2 font-semibold text-gray-600">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="block w-full p-3 text-gray-600 placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline focus:border-blue-200" placeholder="Name" />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-600">Quantity</label>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="block w-full p-3 text-gray-600 placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline focus:border-blue-200" placeholder="Quantity" />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-600">Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="block w-full p-3 text-gray-600 placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline focus:border-blue-200" placeholder="Price" />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-gray-600">Image URL</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="block w-full p-3 text-gray-600 placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline focus:border-blue-200" placeholder="Image URL" />
                    </div>
                    <div>
                        { !isLoading &&  (<button className="block w-full px-4 py-2 mt-6 font-bold text-white bg-blue-700 rounded-sm hover:bg-blue-600 hover:cursor-pointer">Save</button>)}
                        
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreatePage;
