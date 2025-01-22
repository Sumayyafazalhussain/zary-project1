"use client"
import React from "react";
import Link from "next/link";

// Define the Product type
type Product = {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
};

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = React.useState<Product[]>(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const removeFromWishlist = (productId: string) => {
    const updatedWishlist = wishlist.filter(
      (item: Product) => item._id !== productId
    );
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Update local storage
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="text-center">
          <p>Your wishlist is empty.</p>
          <Link href="/" className="text-blue-500 underline">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((product: Product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
