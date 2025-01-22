'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/footer';
import Header from '../components/header';

// Define Product type
interface Product {
  description: string;
  price: number; // Price in USD
  oldPrice?: number;
  discount?: string;
  _id: string;
  name: string;
  imageUrl: string;
}

// Define CartItem type
interface CartItem extends Product {
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [exchangeRate, setExchangeRate] = useState<number>(0); // Store exchange rate

  // Load cart from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    // Fetch the exchange rate or set a fixed rate
    const fetchExchangeRate = async () => {
      // For the sake of this example, let's use a fixed exchange rate. 
      // You can replace this part with an API call to get the real-time exchange rate.
      const rate = 280; // Example conversion rate (USD to PKR)
      setExchangeRate(rate);
    };
    
    fetchExchangeRate();
  }, []); // Runs once when the component mounts

  // Deduplicate items in the cart
  const deduplicatedCartItems = cartItems.filter(
    (item, index, self) =>
      index === self.findIndex((i) => i._id === item._id)
  );

  // Convert USD to PKR
  const convertToPKR = (usdPrice: number) => {
    return (usdPrice * exchangeRate).toFixed(2); // Return converted price
  };

  // Calculate total price in PKR
  const totalPrice = deduplicatedCartItems.reduce(
    (total, item) => total + item.price * item.quantity * exchangeRate,
    0
  );

  // Handle quantity change
  const handleQuantityChange = (id: string, action: string) => {
    const updatedItems = deduplicatedCartItems.map((item) =>
      item._id === id
        ? {
            ...item,
            quantity:
              action === 'increase'
                ? item.quantity + 1
                : item.quantity > 1
                ? item.quantity - 1
                : 1,
          }
        : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems)); // Update localStorage
  };

  // Handle item removal
  const handleRemoveItem = (id: string) => {
    const updatedItems = deduplicatedCartItems.filter((item) => item._id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems)); // Update localStorage
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 mt-10">
          {/* Cart Item List */}
          <div className="flex-1 lg:w-[70%] w-full">
            <div className="bg-[#F9F1E7] rounded-xl p-6 shadow-xl mb-8">
              <Image
                src="/Cart.png"
                alt="Shopping Cart"
                width={1440}
                height={316}
                className="w-full rounded-xl"
              />
            </div>

            <div className="bg-[#F9F1E7] rounded-lg px-6 py-4 mb-8 flex justify-between items-center shadow-md">
              <p className="text-black text-xl font-semibold w-[45%]">Product</p>
              <p className="text-black text-xl font-semibold w-[25%]">Price</p>
              <p className="text-black text-xl font-semibold w-[20%]">Quantity</p>
              <p className="text-black text-xl font-semibold w-[25%]">Subtotal</p>
            </div>

            <div className="space-y-6">
              {deduplicatedCartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white py-6 px-8 border-b border-[#E0E0E0] flex justify-between items-center rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 w-[45%]">
                    {item.imageUrl ? (
                      <div className="w-28 h-20 relative">
                        <Image
                          src={item.imageUrl || '/default-image.png'}
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-20 bg-gray-300 rounded-md" />
                    )}

                    <div>
                      <p className="text-[#333333] text-lg font-medium">{item.name}</p>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  </div>

                  <p className="text-[#333333] text-lg font-medium w-[25%]">
                    Rs. {convertToPKR(item.price)}
                  </p>

                  <div className="flex items-center w-[20%] space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, 'decrease')}
                      className="bg-[#f0f0f0] text-lg font-medium px-4 py-2 rounded-md hover:bg-[#ddd] transition-colors duration-300"
                    >
                      -
                    </button>
                    <p className="text-[#333333] text-lg font-medium">{item.quantity}</p>
                    <button
                      onClick={() => handleQuantityChange(item._id, 'increase')}
                      className="bg-[#f0f0f0] text-lg font-medium px-4 py-2 rounded-md hover:bg-[#ddd] transition-colors duration-300"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-[#333333] text-lg font-medium w-[25%]">
                    Rs. {convertToPKR(item.price * item.quantity)}
                  </p>

                  <div className="w-[10%] flex justify-center items-center">
                    <Image
                      src="/delete.png"
                      alt="Delete"
                      width={24}
                      height={24}
                      className="cursor-pointer hover:scale-110 transition-transform duration-200"
                      onClick={() => handleRemoveItem(item._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:w-[393px] w-full bg-[#F9F1E7] p-8 rounded-xl shadow-xl">
            <h2 className="font-semibold text-3xl text-center mb-6 text-gray-800">Cart Totals</h2>
            <div className="space-y-4">
              <p className="text-black text-lg font-medium">
                Subtotal: <span className="text-gray-500">Rs. {totalPrice.toLocaleString()}</span>
              </p>
              <p className="text-[#B88E2F] text-2xl font-semibold">
                Total: Rs. {totalPrice.toLocaleString()}
              </p>
            </div>

            <Link href="/cheakout">
              <button className="w-full mt-6 py-4 text-xl font-bold text-white bg-[#B88E2F] rounded-lg shadow-lg hover:bg-[#9F7625] transition-colors duration-300 mb-4">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <br />
      <div className="bg-[#FAF3EA] py-20 px-5 sm:px-10 lg:px-10 flex flex-wrap justify-between gap-6">
        {[ 
          { src: '/cup.png', title: 'Top Quality', desc: 'Made with premium materials' },
          { src: '/guarantee.png', title: 'Warranty Protection', desc: 'Coverage for 2+ years' },
          { src: '/shipping.png', title: 'Free Shipping', desc: 'On orders above $150' },
          { src: '/customer-support.png', title: '24/7 Support', desc: 'We are always here to assist' },
        ].map((feature, idx) => (
          <div key={idx} className="flex gap-4 items-center w-full sm:w-[45%] lg:w-[22%]">
            <img src={feature.src} width={50} height={50} alt={feature.title} className="w-10" />
            <div>
              <h5 className="font-poppins font-bold text-[20px] sm:text-[22px] md:text-[24px]">
                {feature.title}
              </h5>
              <p className="text-[#898989] text-sm sm:text-base">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
