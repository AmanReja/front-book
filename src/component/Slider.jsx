import React, { useState, useEffect, useCallback } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

function Slider() {
  const base_url = "https://book-backend-ust3.onrender.com";
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch Products
  async function getProducts() {
    try {
      const response = await fetch(`${base_url}/seller/getAllBooks`);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  // Memoized navigation to prevent unnecessary re-renders
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  }, [products.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  // Auto-play logic
  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(nextSlide, 5000); // 5 seconds for better UX
    return () => clearInterval(interval);
  }, [nextSlide, products.length]);

  if (loading) return <div className="h-[500px] flex items-center justify-center">Loading...</div>;
  if (products.length === 0) return null;

  return (
    <div className="relative w-full max-w-[1200px] h-[500px] md:h-[600px] mx-auto mt-10 px-4 group">
      {/* Main Image Container */}
      <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl bg-gray-200">
        {products.map((item, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${item.bookimage})` }}
            className={`absolute inset-0 bg-center bg-cover transition-all duration-1000 ease-in-out transform ${
              index === currentIndex 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            {/* Dark Overlay for better text visibility (Optional) */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            
            {/* Content overlay (Optional: can add Book Title here) */}
            <div className="absolute bottom-16 left-10 text-white">
               <h2 className="text-3xl font-bold drop-shadow-lg">{item.bookname}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Glassmorphism style */}
      <button
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-8 z-10 p-3 rounded-full bg-white/30 backdrop-blur-md text-white hover:bg-white/50 transition-all"
      >
        <BsChevronCompactLeft size={30} />
      </button>

      <button
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-8 z-10 p-3 rounded-full bg-white/30 backdrop-blur-md text-white hover:bg-white/50 transition-all"
      >
        <BsChevronCompactRight size={30} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 transition-all duration-300 rounded-full ${
              index === currentIndex 
                ? "w-8 bg-lime-400" 
                : "w-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;