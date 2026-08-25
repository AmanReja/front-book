import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { BsChevronLeft, BsChevronRight, BsArrowRight } from "react-icons/bs";

const Herobanner = () => {
  const base_url = "https://book-backend-ust3.onrender.com";
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch Products for the Slider
  const getProducts = async () => {
    try {
      const response = await fetch(`${base_url}/seller/getAllBooks`);
      const data = await response.json();
      setProducts(data.slice(0, 5)); // Take top 5 for hero
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  }, [products.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, products.length]);

  if (loading) return <div className="h-screen bg-[#0f0f0f] flex items-center justify-center text-white">Loading...</div>;

  return (
    <section className="relative min-h-screen w-full bg-[#0a0a0a] overflow-hidden flex items-center pt-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-lime-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[30%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT CONTENT: Typography */}
          <div className="lg:col-span-7 text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium">New Arrivals 2024</span>
            </div>

            <h1 className="font-['DM_Serif_Display'] text-5xl md:text-7xl lg:text-8xl text-[#f5f0e8] leading-[1.1] mb-6">
              Every page is <br />
              <span className="italic text-white/40">an adventure.</span>
            </h1>

            <p className="max-w-lg text-white/40 text-lg md:text-xl leading-relaxed mb-10">
              Discover a sanctuary of curated stories. From timeless classics to 
              modern masterpieces, find the book that speaks to your soul.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link to="/products">
                <button className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all hover:pr-12">
                  <span className="relative z-10">Browse Collection</span>
                  <BsArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </Link>
              <Link to="/about" className="px-8 py-4 text-white font-medium border border-white/10 rounded-full hover:bg-white/5 transition-all">
                Our Story
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-8 max-w-md">
              <div>
                <div className="text-2xl font-bold text-white">12k+</div>
                <div className="text-xs uppercase tracking-wider text-white/30">Titles</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">8k+</div>
                <div className="text-xs uppercase tracking-wider text-white/30">Authors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs uppercase tracking-wider text-white/30">Support</div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT: Modernized Slider */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative group perspective-1000">
              {/* Slider Main Frame */}
              <div className="relative aspect-[3/4] w-full max-w-[400px] mx-auto rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
                {products.map((item, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.23, 1, 0.32, 1)] ${
                      index === currentIndex ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-110 rotate-3 pointer-events-none"
                    }`}
                  >
                    <img 
                      src={item.bookimage} 
                      alt={item.bookname}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Floating Info on Image */}
                    <div className="absolute bottom-8 left-8 right-8">
                        <p className="text-lime-400 text-xs font-bold uppercase tracking-widest mb-2">Featured Book</p>
                        <h3 className="text-2xl font-bold text-white mb-1 leading-tight">{item.bookname}</h3>
                        <p className="text-white/60 text-sm italic">by {item.author || "Global Author"}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Controls */}
              <div className="absolute -bottom-6 right-0 left-0 flex justify-center lg:justify-end lg:right-4 gap-2">
                <button 
                  onClick={prevSlide}
                  className="p-4 rounded-full bg-[#1a1a1a] border border-white/10 text-white hover:bg-lime-500 hover:text-black transition-all shadow-xl"
                >
                  <BsChevronLeft size={20} />
                </button>
                <button 
                  onClick={nextSlide}
                  className="p-4 rounded-full bg-[#1a1a1a] border border-white/10 text-white hover:bg-lime-500 hover:text-black transition-all shadow-xl"
                >
                  <BsChevronRight size={20} />
                </button>
              </div>

              {/* Decorative Book Stack Effect */}
              <div className="absolute -z-10 top-8 -right-4 w-full h-full border border-white/5 bg-white/5 rounded-[2rem] rotate-3" />
              <div className="absolute -z-20 top-16 -right-8 w-full h-full border border-white/5 bg-white/5 rounded-[2rem] rotate-6" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Herobanner;