import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MousePointerClick, Move } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import solarPanelsImg from '../assets/markus-spiske-pwFr_1SUXRo-unsplash.jpg';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  wattage?: string;
}

const solarPanels: Product[] = [
  {
    id: 1,
    name: "Monocrystalline Solar Panel",
    description: "High-efficiency panel with sleek design, ideal for residential installations.",
    price: "₹15,999",
    wattage: "450W",
    image: "https://images.unsplash.com/photo-1615229337274-d3b181f7c9a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    name: "Polycrystalline Solar Panel",
    description: "Budget-friendly option with great performance for larger installations.",
    price: "₹12,999",
    wattage: "400W",
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    name: "Bifacial Solar Panel",
    description: "Captures sunlight from both sides, increasing energy harvest throughout the day.",
    price: "₹21,499",
    wattage: "500W",
    image: "https://images.unsplash.com/photo-1611365892117-6dd2b8273875?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    name: "Flexible Solar Panel",
    description: "Lightweight and bendable for irregular surfaces and portable applications.",
    price: "₹9,999",
    wattage: "200W",
    image: "https://images.unsplash.com/photo-1592833167665-ebf29dc47119?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 5,
    name: "PERC Solar Panel",
    description: "Advanced passivation technology for higher efficiency in limited space.",
    price: "₹18,499",
    wattage: "475W",
    image: "https://images.unsplash.com/photo-1559302995-f8d6c018999e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 6,
    name: "Half-Cut Cell Solar Panel",
    description: "Reduced internal resistance and improved performance in partial shading.",
    price: "₹19,999",
    wattage: "485W",
    image: "https://images.unsplash.com/photo-1591866487061-7a3f9e7f85cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];

const ProductsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [showDragHint, setShowDragHint] = useState(true);
  
  // Simulate loading time for products
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show loading state for 2 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  // Hide drag hint after user has interacted with the carousel
  useEffect(() => {
    if (isDragging) {
      setShowDragHint(false);
    }
  }, [isDragging]);
  
  // Add auto scrolling animation
  useEffect(() => {
    if (isLoading) return; // Don't activate scroll until products are loaded
    
    const container = scrollContainerRef.current;
    if (!container) return;
    
    let animationId: number;
    let isPaused = false;
    let startX = 0;
    let startScrollLeft = 0;
    let isMouseDown = false;
    
    const scrollSpeed = 0.5; // pixels per frame
    let currentScrollPosition = 0;
    
    const animate = () => {
      if (!isPaused && container && !isMouseDown) {
        currentScrollPosition += scrollSpeed;
        if (currentScrollPosition >= container.scrollWidth - container.clientWidth) {
          currentScrollPosition = 0;
        }
        container.scrollLeft = currentScrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationId = requestAnimationFrame(animate);
    
    // Pause on hover/touch
    const handleMouseEnter = () => { 
      isPaused = true; 
    };
    
    const handleMouseLeave = () => { 
      isPaused = false;
      setIsDragging(false);
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      isPaused = true;
      startX = e.touches[0].pageX;
      startScrollLeft = container.scrollLeft;
      setIsDragging(true);
    };
    
    const handleTouchEnd = () => {
      isPaused = false;
      setIsDragging(false);
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      isPaused = true;
      isMouseDown = true;
      startX = e.pageX;
      startScrollLeft = container.scrollLeft;
      container.style.cursor = 'grabbing';
      setIsDragging(true);
    };
    
    const handleMouseUp = () => {
      isMouseDown = false;
      container.style.cursor = 'grab';
      setIsDragging(false);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const x = e.pageX;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      container.scrollLeft = startScrollLeft - walk;
    };
    
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);
    
    // Auto-hide drag hint after 5 seconds even if user hasn't interacted
    const hintTimer = setTimeout(() => {
      setShowDragHint(false);
    }, 5000);
    
    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(hintTimer);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isLoading]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="products" className="py-20 relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={solarPanelsImg} 
          alt="Solar panels background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl mb-8">
          <h2 className="text-4xl font-bold mb-3 text-gray-800">Our Products</h2>
          <p className="text-gray-700 max-w-2xl">
            Discover our range of high-quality solar panels designed to meet various energy needs for homes and businesses across Kerala.
          </p>
        </div>
        
        <div className="relative">
          {/* Visual drag hint */}
          {showDragHint && !isLoading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-black/70 text-white px-4 py-3 rounded-lg flex items-center space-x-2 animate-pulse shadow-lg">
              <Move className="h-5 w-5" />
              <span>Drag to explore all products</span>
            </div>
          )}
          
          {/* Navigation arrows */}
          <button 
            onClick={scrollLeft}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 glass p-3 rounded-full shadow-lg z-10 hover:bg-white/40 transition-all duration-300 hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 text-sky-600" />
          </button>
          
          <button 
            onClick={scrollRight}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 glass p-3 rounded-full shadow-lg z-10 hover:bg-white/40 transition-all duration-300 hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 text-sky-600" />
          </button>
          
          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-6 snap-x cursor-grab scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {isLoading ? (
              // Skeleton loaders when loading
              Array(6).fill(0).map((_, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-80 glass-card rounded-xl overflow-hidden shadow-md snap-start animate-pulse"
                >
                  <div className="h-48 overflow-hidden">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Skeleton className="h-6 w-40" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-5/6 mt-2 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-9 w-28 rounded-md" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Actual products after loading
              solarPanels.map((panel) => (
                <div 
                  key={panel.id}
                  className="flex-shrink-0 w-80 glass-card rounded-xl overflow-hidden shadow-lg snap-start hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group bg-white/90 backdrop-blur-md"
                >
                  <div className="h-48 overflow-hidden relative group">
                    <img 
                      src={panel.image} 
                      alt={panel.name} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 transition-opacity duration-300"></div>
                    
                    {/* Product wattage on image */}
                    {panel.wattage && (
                      <span className="absolute top-3 right-3 bg-white/90 text-sky-800 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm shadow-md">
                        {panel.wattage}
                      </span>
                    )}
                    
                    {/* Product name on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-bold text-xl text-white drop-shadow-md">{panel.name}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">{panel.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-sky-600 group-hover:text-sky-700 transition-colors duration-300 drop-shadow-sm">{panel.price}</span>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 rounded-full px-4 shadow-md shadow-blue-500/20 hover:shadow-blue-600/30 transition-all duration-300"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;