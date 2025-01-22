"use client";
import React, { useState, useEffect } from "react";

const placeholderImage = "https://via.placeholder.com/300"; // Fallback image

const Home: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cartModelVisibility, setCartModelVisibility] = useState<boolean>(false);
  const [cart, setCart] = useState<any[]>([]); // Cart state to store added items

  // Load cart data from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart)); // Parse and set the cart if data exists
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://678319a78b6c7a1316f37b09.mockapi.io/ecommerceweb"
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch data: ${res.statusText}`);
        }

        const fetchedData = await res.json();
        setData(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add item to the cart
  const handleAddToCart = (item: any) => {
    const updatedCart = [
      ...cart,
      { ...item, images: item.images || placeholderImage, quantity: 1 },
    ];
    setCart(updatedCart);

    // Store updated cart in localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCartModelVisibility(true); // Show cart modal
  };

  // Render cart items
  const renderCartItems = () => {
    return cart.map((item, index) => (
      <div key={index} className="flex items-center gap-4 mb-4">
        <img
          src={item.images || placeholderImage}
          alt={item.productname || "Product image"}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="flex-1">
          <h4 className="text-lg font-medium text-gray-800">{item.productname}</h4>
          <p className="text-sm text-gray-600">{item.productdesc}</p>
        </div>
        <span className="text-gray-800 font-bold">{item.price} Rupees</span>
      </div>
    ));
  };

  // Function to calculate subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = parseFloat(item.price);
      if (!isNaN(itemPrice)) {
        return total + itemPrice * item.quantity; // Ensure price and quantity are valid
      }
      return total;
    }, 0);
  };

  const closeModel = () => {
    setCartModelVisibility(false); // Close the cart modal
  };

  return (
    <div className="min-h-screen bg-white px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Our Products</h1>
        <p className="text-xl text-gray-600 mt-2 mb-4">Our Best Products are Here</p>
      </div>

      {loading && <p className="text-center text-yellow-400">Loading...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {data.map((item) => (
          <div
            key={item.id} // Use unique key (item.id)
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300"
          >
            <div className="relative w-full h-64">
              <img
                src={item.image || placeholderImage} // Updated image field
                alt={item.productname || "Product image"}
                className="w-full h-full object-cover rounded-t-lg"
              />
              {item.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white py-1 px-3 text-xs font-semibold rounded-full shadow">
                  {item.discount}% OFF
                </div>
              )}
            </div>

            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800">{item.productname}</h2>
              <p className="text-sm text-gray-600 mt-1">{item.productdesc}</p>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-gray-600">Price:</span>
                  <span className="text-xl font-bold text-gray-800">
                    {item.price} Rupees
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(item)} // Pass the item to the function
                className="mt-6 bg-blue-600 text-white rounded-lg py-3 px-6 text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-blue-700"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {cartModelVisibility && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Product Added To Cart
            </h2>
            <div className="overflow-y-auto max-h-40">{renderCartItems()}</div>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={closeModel}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
              >
                Continue Shopping
              </button>
              <a
                href="/cart"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Visit Cart
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
