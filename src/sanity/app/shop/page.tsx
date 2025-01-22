"use client"; // Required for Next.js app routing

import React, { useState, useEffect } from "react";
import { sanityFetch } from "../../sanity/lib/fetch";
import { allproducts } from "../api/query";
import Header from "../components/header";
import Link from "next/link";
import Imagehead from "../../app/shop/Imagehead";
import { AiOutlineHeart } from "react-icons/ai"; // Heart Icon from React Icons

type Product = {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
};

const placeholderImage = "https://via.placeholder.com/300";

const Main: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(16);
  const [sortBy, setSortBy] = useState<string>("default");
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await sanityFetch({ query: allproducts });
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToWishlist = (product: Product) => {
    const existingWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );
    const updatedWishlist = [...existingWishlist, product];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price") {
      return a.price - b.price;
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0; // Default
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const FilterBar = () => {
    return (
      <div className="flex flex-wrap gap-5 px-5 py-6 mt-10 w-full bg-red-50 text-black max-md:px-3 max-md:mt-8 max-md:gap-3">
        <div className="flex items-center gap-5 sm:gap-6 flex-grow">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2452e8d6579f3e54380136ba6a8be013520d923e996079b0d5c27b60987ad7c4?placeholderIfAbsent=true&apiKey=b77517f4450544a992d89244a6a7443d"
            alt="Filter Icon"
            className="w-6 sm:w-7"
          />
          <div className="flex flex-wrap gap-3 items-center text-base sm:text-lg">
            <div className="flex-grow text-center sm:text-left">
              Showing {indexOfFirstProduct + 1}–
              {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
              {filteredProducts.length} results
            </div>
          </div>
        </div>

        <div className="flex gap-5 sm:gap-8 items-center flex-grow text-sm sm:text-base">
          <div className="my-auto">Show</div>
          <select
            className="bg-white px-5 py-3 text-neutral-400 rounded-lg w-[75px]"
            value={productsPerPage}
            onChange={(e) => {
              setProductsPerPage(Number(e.target.value));
              setCurrentPage(1); // Resetting to the first page on change
            }}
          >
            <option value={16}>16</option>
            <option value={32}>32</option>
            <option value={48}>48</option>
          </select>

          <div className="my-auto">Sort by</div>
          <select
            className="bg-white px-5 py-3 text-neutral-400 rounded-lg max-md:px-5"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>

          <input
            type="text"
            placeholder="Filter by name"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
    );
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <Imagehead />
      <div className="min-h-screen bg-gray-100 px-4 py-8">
        <FilterBar />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            currentProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300 cursor-pointer"
              >
                <Link href={`/shop/${product._id}`}>
                  <div className="relative w-full h-64">
                    <img
                      src={product.imageUrl || placeholderImage}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="p-4 flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 truncate">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1 h-12 overflow-hidden">
                      {product.description}
                    </p>
                    <div className="mt-4 text-xl font-bold text-indigo-600">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                  <Link href="/wishlist">
                    <AiOutlineHeart
                      onClick={() => {
                        addToWishlist(product); // Add product to wishlist on click
                      }}
                      className="text-2xl text-red-500 hover:text-red-700 transition duration-200"
                    />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-gray-800 rounded-l-md disabled:bg-gray-400"
          >
            Prev
          </button>
          <div className="px-4 py-2 text-lg font-medium">{currentPage}</div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-white bg-gray-800 rounded-r-md disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;
