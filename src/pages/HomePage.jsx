import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Product from "../components/Product";
import TableProduct from "../components/TableProduct";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://basic-fullstack-backend.onrender.com/api/products");
      console.log(response.data)
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div>
        <Link
          to="/create"
          className="inline-block px-4 py-2 mt-4 font-bold text-white bg-blue-700 rounded-sm shadow-md hover:bg-blue-600 hover:cursor-pointer"
        >
          Create a Product
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5 lg:grid-cols-4">
        {isLoading ? (
          "Loading"
        ) : (
          <>
            {products.length > 0 ? (
              <>
                {products.map((product, index) => {
                  return (
                    <Product
                      key={index}
                      product={product}
                      getProducts={getProducts}
                    />
                  );
                })}
              </>
            ) : (
              <div className="p-4 mt-4 font-serif text-white bg-gray-800">
                There is no product
              </div>
            )}
          </>
        )}
      </div>

      <TableProduct products={products} />
    </div>
  );
};

export default HomePage;
