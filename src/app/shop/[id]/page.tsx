"use client"; // Required for Next.js app routing

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { client } from "../../../sanity/lib/client";
import { productDetailQuery } from "../../api/query";
import Header from "../../components/header";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useToast, Toast } from "../../components/ui/use-toast";
import { useCart } from "../../components/contexts/CartContext";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  discountPercentage: number;
  isFeaturedProduct: boolean;
  stockLevel: number;
  category: string;
};

const Breadcrumb = () => (
  <nav className="flex gap-3 items-center px-20 py-8 bg-white shadow-md max-md:px-5">
    <div className="flex items-center">
      <span className="font-medium text-gray-700">Home</span>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/db13939cabd153a09de09c25864d1f622bda5d116dbe6552d6605aca283c27a4"
        alt="breadcrumb separator"
        className="w-5 h-5 mx-2"
      />
    </div>
    <div className="flex items-center">
      <span className="font-medium text-gray-700">Shop</span>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/db13939cabd153a09de09c25864d1f622bda5d116dbe6552d6605aca283c27a4"
        alt="breadcrumb separator"
        className="w-5 h-5 mx-2"
      />
    </div>
    <div className="flex items-center">
      <span className="font-medium text-gray-700">Product</span>
    </div>
  </nav>
);

const ProductDetails: React.FC<{
  product: Product;
  quantity: number;
  setQuantity: (quantity: number) => void;
  handleAddToCart: () => void;
}> = ({ product, quantity, setQuantity, handleAddToCart }) => (
  <div className="flex flex-col lg:flex-row items-start justify-between p-10 bg-white shadow-md rounded-lg">
    <div className="flex-1">
      <img
        src={product.imageUrl || "/placeholder.svg"}
        alt={product.name}
        className="w-full h-96 object-cover rounded-lg"
      />
    </div>
    <div className="flex-1 pl-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
      <p className="text-2xl text-gray-700 mb-4">Rs. {product.price.toFixed(2)}</p>
      <p className="text-base text-gray-600 mb-6">{product.description}</p>
      <div className="flex items-center mb-6">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="bg-gray-200 p-2 rounded-l-md hover:bg-gray-300"
        >
          <Minus className="w-5 h-5" />
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Math.min(product.stockLevel, Math.max(1, parseInt(e.target.value) || 1))
            )
          }
          className="w-16 text-center border-t border-b border-gray-200 p-2"
        />
        <button
          onClick={() =>
            setQuantity(Math.min(product.stockLevel, quantity + 1))
          }
          className="bg-gray-200 p-2 rounded-r-md hover:bg-gray-300"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <Link href="/cart">
        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </Link>
      <p className="text-sm text-gray-500 mt-4">
        {product.stockLevel} items left in stock
      </p>
    </div>
  </div>
);

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();
  const { toast, showToast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await client.fetch(productDetailQuery, { id });
        setProduct(fetchedProduct);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    if (quantity > product.stockLevel) {
      showToast("Not enough stock available", "error");
      return;
    }

    try {
      const updatedStock = product.stockLevel - quantity;

      await client
        .patch(product._id)
        .set({ stockLevel: updatedStock })
        .commit();

      setProduct({ ...product, stockLevel: updatedStock });
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity,
      });

      showToast(`Added ${quantity} ${product.name} to cart`, "success");
    } catch (error) {
      console.error("Failed to update stock:", error);
      showToast("Failed to update stock", "error");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Breadcrumb />
      <ProductDetails
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
        handleAddToCart={handleAddToCart}
      />
      {toast && <Toast toast={toast} />}
    </div>
  );
};

export default ProductDetailPage;
