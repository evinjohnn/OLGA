import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "../components/ui/button";

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
    <section id="products" className="py-20 bg-sky-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-3 text-gray-800">Our Products</h2>
        <p className="text-gray-600 mb-12 max-w-2xl">
          Discover our range of high-quality solar panels designed to meet various energy needs for homes and businesses across Kerala.
        </p>
        
        <div className="relative">
          {/* Navigation arrows */}
          <button 
            onClick={scrollLeft}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 text-sky-600" />
          </button>
          
          <button 
            onClick={scrollRight}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10 hover:bg-gray-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 text-sky-600" />
          </button>
          
          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-6 snap-x scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {solarPanels.map((panel) => (
              <div 
                key={panel.id}
                className="flex-shrink-0 w-80 bg-white rounded-xl overflow-hidden shadow-lg snap-start"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={panel.image} 
                    alt={panel.name} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl text-gray-800">{panel.name}</h3>
                    {panel.wattage && (
                      <span className="bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded-full">
                        {panel.wattage}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{panel.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-sky-600">{panel.price}</span>
                    <Button 
                      size="sm" 
                      className="bg-sky-600 hover:bg-sky-700"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;