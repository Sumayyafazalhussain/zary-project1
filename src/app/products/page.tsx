import React from "react";
import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";

const ComparisonPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Header />

     
      <div className="relative bg-gray-100">
        <div className="h-[316px] w-full">
          <Image
            src="/pro.png" 
            alt=""
            width={1440}
            height={316}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            
          </h1>
        </div>
      </div>

      {/* Comparison Table Section */}
      <div className="max-w-screen-xl mx-auto py-8 px-4 flex-1">
        <div className="text-center mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
            Do the Product Comparison
          </h2>
          <button className="bg-[#B88E2F] text-white px-4 py-2 rounded-lg hover:bg-[#a87929]">
            Add Product
          </button>
        </div>

        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  Details
                </th>
                <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  Product 1
                </th>
                <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  Product 2
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  Price
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  Rp 2,500.000
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  Rp 3,500.000
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  Material
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  Wood
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  Metal
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  Dimensions
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  50x60x80 cm
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  60x70x90 cm
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  Availability
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  In Stock
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm sm:text-base">
                  Out of Stock
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

     
      <Footer />
    </div>
  );
};

export default ComparisonPage;
