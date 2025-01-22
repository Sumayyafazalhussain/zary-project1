"use client";
import Header from "./components/header";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Gallery from "./components/Gallery";
import Product from "./components/Product";
import Cards from "./components/Cards";
import Blog from "./components/Blog";
import Instra from "./components/Instra";


export default function App() {
  // Renamed the local function
  return (
    <div>
      <Header />
      <Hero />
      <Gallery/>
      <Cards/>
      <Product/>
      <Instra/>
      <Blog/>
      <br />
      
      
      <br />
      <Footer />
    </div>
  );
}
