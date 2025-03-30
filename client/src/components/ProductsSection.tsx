import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import layoutImage from "@assets/th.png";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  wattage?: string;
}

const ProductsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  const products: Product[] = [
    {
      id: 1,
      name: "Kerala Home Solar Kit",
      description: "Perfect for Kerala homes looking to reduce KSEB bills and ensure power during monsoon outages.",
      price: "₹59,999",
      wattage: "1 kW",
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
    },
    {
      id: 2,
      name: "Commercial Solar Array",
      description: "High-capacity solution for Kerala businesses with substantial energy requirements.",
      price: "₹1,99,999",
      wattage: "10 kW",
      image: "https://images.unsplash.com/photo-1595437193398-f24279553f4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
    },
    {
      id: 3,
      name: "Monocrystalline Premium",
      description: "High-efficiency panels with sleek design and extended warranty for Kerala's tropical climate.",
      price: "₹89,999",
      wattage: "2 kW",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
    },
    {
      id: 4,
      name: "Polycrystalline Standard",
      description: "Cost-effective solution with reliable performance for budget-conscious Kerala customers.",
      price: "₹69,999",
      wattage: "2 kW",
      image: "https://images.unsplash.com/photo-1548448404-22f84406b107?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
    },
    {
      id: 5,
      name: "Bifacial Solar Panel",
      description: "Innovative design optimized for Kerala's equatorial sunlight, capturing light from both sides.",
      price: "₹1,19,999",
      wattage: "3 kW",
      image: "https://images.unsplash.com/photo-1641018121466-61d1168656b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
    },
    {
      id: 6,
      name: "Portable Solar Kit",
      description: "Compact and foldable panels for camping in Kerala's hills, houseboats, and emergency power needs.",
      price: "₹29,999",
      wattage: "500 W",
      image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=300&q=80"
    },
  ];

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-[#1E293B] mb-2">Our Products</h2>
          <div className="w-20 h-1 bg-[#008FD5] mx-auto mb-4"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Discover our range of high-quality solar panels designed to meet various energy needs and budgets.
          </p>
        </div>
        
        {/* Product Navigation Controls */}
        <div className="flex justify-end mb-6">
          <div className="flex space-x-3">
            <button 
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-[#008FD5] hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={scrollRight}
              className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center hover:bg-[#008FD5] hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Horizontally Scrollable Products */}
        <div className="relative overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 -mx-4 px-4 hide-scrollbar scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div 
                key={product.id}
                className="flex-shrink-0 w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-16px)] mx-2 bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 snap-start"
              >
                <div 
                  className="w-full h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image})` }}
                  aria-label={product.name}
                ></div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#1E293B] mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">{product.description}</p>
                  {product.wattage && (
                    <div className="bg-[#00BF63]/10 text-[#00BF63] inline-block px-2 py-1 rounded-md text-sm font-medium mb-3">
                      {product.wattage}
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-[#008FD5] font-bold">{product.price}</span>
                    <Button className="bg-[#008FD5] hover:bg-[#008FD5]/90 text-white">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Banner */}
        <div className="mt-12 bg-[#008FD5] rounded-lg p-8 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold font-montserrat mb-3">Ready to Switch to Solar?</h3>
              <p className="mb-0">
                Our experts will help you find the perfect solar solution for your needs. Contact us today for a free consultation and quote.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Button 
                asChild
                variant="secondary" 
                className="bg-white text-[#008FD5] hover:bg-gray-100 font-bold"
              >
                <a href="#contact">Get a Free Quote</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
