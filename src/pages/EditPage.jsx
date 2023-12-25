import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
  });

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://basic-fullstack-backend.onrender.com/api/products/${id}`);
      setProduct({
        name: response.data.name,
        quantity: response.data.quantity,
        price: response.data.price,
        image: response.data.image,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://basic-fullstack-backend.onrender.com/api/products/${id}`, product);
      toast.success("Updated a product successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-6 bg-white rounded shadow-lg p-7">
      <h2 className="block mb-4 text-2xl font-semibold text-center">
        Edit a Product
      </h2>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <form onSubmit={updateProduct}>
            <div className="space-y-2">
              <div>
                <label className="block mb-2 font-semibold text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                  className="block w-full p-3 text-gray-600 placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline focus:border-blue-200"
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-600">
                  Quantity
                </label>
                <input
                  type="text"
                  value={product.quantity}
                  onChange={(e) =>
                    setProduct({ ...product, quantity: e.target.value })
                  }
                  className="block w-full p-3 text-gray-600 placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline focus:border-blue-200"
                  placeholder="Quantity"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-600">
                  Price
                </label>
                <input
                  type="text"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  className="block w-full p-3 text-gray-600 placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline focus:border-blue-200"
                  placeholder="Price"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-600">
                  Image URL
                </label>
                <input
                  type="text"
                  value={product.image}
                  onChange={(e) =>
                    setProduct({ ...product, image: e.target.value })
                  }
                  className="block w-full p-3 text-gray-600 placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline focus:border-blue-200"
                  placeholder="Image URL"
                />

                {product.image && (
                  <div className="w-1/2 p-2 mt-4 border rounded ">
                    <img className="w-full" src={product.image} />
                  </div>
                )}
              </div>
              <div>
                <button className="block w-full px-4 py-2 mt-6 font-bold text-white bg-blue-700 rounded-sm hover:bg-blue-600 hover:cursor-pointer">
                  Update
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default EditPage;
