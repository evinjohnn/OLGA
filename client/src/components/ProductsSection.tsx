import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Move, X, CheckCircle, Clock, Battery, Zap } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import solarPanelsImg from '../assets/markus-spiske-pwFr_1SUXRo-unsplash.jpg';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  wattage?: string;
  efficiency?: string;
  warranty?: string;
  lifespan?: string;
  features?: string[];
  specifications?: {
    dimensions?: string;
    weight?: string;
    cellType?: string;
    certification?: string[];
  };
}

const solarPanels: Product[] = [
  {
    id: 1,
    name: "Monocrystalline Solar Panel",
    description: "High-efficiency panel with sleek design, ideal for residential installations. Monocrystalline panels offer premium performance and aesthetic appeal with their uniform black appearance.",
    price: "₹15,999",
    wattage: "450W",
    efficiency: "21.5%",
    warranty: "25 years",
    lifespan: "30+ years",
    image: "https://images.unsplash.com/photo-1615229337274-d3b181f7c9a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Premium efficiency and performance",
      "Sleek, uniform black appearance",
      "Higher power output per square meter",
      "Better performance in low-light conditions",
      "Low temperature coefficient"
    ],
    specifications: {
      dimensions: "1700 × 1000 × 35 mm",
      weight: "19.8 kg",
      cellType: "Monocrystalline PERC",
      certification: ["IEC 61215", "IEC 61730", "BIS Certified"]
    }
  },
  {
    id: 2,
    name: "Polycrystalline Solar Panel",
    description: "Budget-friendly option with great performance for larger installations. These panels offer an excellent balance of affordability and efficiency for commercial and residential use.",
    price: "₹12,999",
    wattage: "400W",
    efficiency: "18.6%",
    warranty: "20 years",
    lifespan: "25+ years",
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Cost-effective solution",
      "Good efficiency at a lower price point",
      "Suitable for larger installations",
      "Blue marbled appearance",
      "Great for hot climates"
    ],
    specifications: {
      dimensions: "1650 × 992 × 35 mm",
      weight: "18.5 kg",
      cellType: "Polycrystalline Silicon",
      certification: ["IEC 61215", "IEC 61730", "ISO 9001", "BIS Certified"]
    }
  },
  {
    id: 3,
    name: "Bifacial Solar Panel",
    description: "Captures sunlight from both sides, increasing energy harvest throughout the day. Perfect for ground installations where reflected light can be captured from below.",
    price: "₹21,499",
    wattage: "500W",
    efficiency: "22.8%",
    warranty: "30 years",
    lifespan: "35+ years",
    image: "https://images.unsplash.com/photo-1611365892117-6dd2b8273875?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Generates power from both sides",
      "10-30% higher energy yield",
      "Transparent backsheet design",
      "Reduced solar heat gain",
      "Snow and dust shedding capabilities"
    ],
    specifications: {
      dimensions: "1721 × 1016 × 30 mm",
      weight: "21.3 kg",
      cellType: "Monocrystalline Bifacial",
      certification: ["IEC 61215", "IEC 61730", "UL 1703"]
    }
  },
  {
    id: 4,
    name: "Flexible Solar Panel",
    description: "Lightweight and bendable for irregular surfaces and portable applications. These panels can flex up to 30 degrees and are ideal for curved roofs, RVs, boats, and camping setups.",
    price: "₹9,999",
    wattage: "200W",
    efficiency: "19.2%",
    warranty: "15 years",
    lifespan: "20+ years",
    image: "https://images.unsplash.com/photo-1592833167665-ebf29dc47119?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Ultra-lightweight design",
      "Bendable up to 30 degrees",
      "Easy installation without mounting hardware",
      "Ideal for mobile and portable applications",
      "Resistant to extreme weather conditions"
    ],
    specifications: {
      dimensions: "1400 × 540 × 2.5 mm",
      weight: "2.4 kg",
      cellType: "Thin-film CIGS",
      certification: ["IEC 61215", "IEC 61730", "ROHS"]
    }
  },
  {
    id: 5,
    name: "PERC Solar Panel",
    description: "Advanced passivation technology for higher efficiency in limited space. PERC (Passivated Emitter Rear Cell) technology improves light absorption and electron capture.",
    price: "₹18,499",
    wattage: "475W",
    efficiency: "23.5%",
    warranty: "25 years",
    lifespan: "30+ years",
    image: "https://images.unsplash.com/photo-1559302995-f8d6c018999e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Higher energy yield with same footprint",
      "Better performance in high temperatures",
      "Improved weak light performance",
      "Lower LCOE (Levelized Cost of Energy)",
      "Enhanced rear surface passivation"
    ],
    specifications: {
      dimensions: "1730 × 1042 × 35 mm",
      weight: "20.5 kg",
      cellType: "Monocrystalline PERC",
      certification: ["IEC 61215", "IEC 61730", "TÜV Certified"]
    }
  },
  {
    id: 6,
    name: "Half-Cut Cell Solar Panel",
    description: "Reduced internal resistance and improved performance in partial shading. By cutting cells in half, these panels lower resistive losses and improve durability and shade tolerance.",
    price: "₹19,999",
    wattage: "485W",
    efficiency: "22.1%",
    warranty: "25 years",
    lifespan: "30+ years",
    image: "https://images.unsplash.com/photo-1591866487061-7a3f9e7f85cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    features: [
      "Lower resistive losses",
      "Better performance in partial shade",
      "Reduced hot spot potential",
      "Higher mechanical reliability",
      "Lower temperature coefficient"
    ],
    specifications: {
      dimensions: "1755 × 1038 × 35 mm",
      weight: "21.2 kg",
      cellType: "Half-cut Monocrystalline",
      certification: ["IEC 61215", "IEC 61730", "ISO 9001", "BIS Certified"]
    }
  }
];

const ProductsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [showDragHint, setShowDragHint] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
  
  // Fixed scrolling implementation
  useEffect(() => {
    if (isLoading) return; // Don't activate scroll until products are loaded
    
    const container = scrollContainerRef.current;
    if (!container) return;
    
    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    let isDown = false;
    
    // Auto-hide drag hint after 5 seconds even if user hasn't interacted
    const hintTimer = setTimeout(() => {
      setShowDragHint(false);
    }, 5000);
    
    // Mouse event handlers
    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      container.classList.add('active');
      startX = e.pageX;
      startY = e.pageY;
      startScrollLeft = container.scrollLeft;
      setIsDragging(true);
      container.style.cursor = 'grabbing';
      container.style.userSelect = 'none';
    };
    
    const onMouseLeave = () => {
      isDown = false;
      container.classList.remove('active');
      setIsDragging(false);
      container.style.cursor = 'grab';
      container.style.removeProperty('user-select');
    };
    
    const onMouseUp = () => {
      isDown = false;
      container.classList.remove('active');
      setIsDragging(false);
      container.style.cursor = 'grab';
      container.style.removeProperty('user-select');
    };
    
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      
      const x = e.pageX;
      const y = e.pageY;
      
      // Calculate both horizontal and vertical movements
      const walkX = (x - startX) * 2;
      const walkY = y - startY;
      
      // If vertical movement is greater than horizontal, 
      // don't scroll horizontally to allow normal page scrolling
      if (Math.abs(walkY) > Math.abs(walkX)) return;
      
      container.scrollLeft = startScrollLeft - walkX;
    };
    
    // Touch event handlers
    const onTouchStart = (e: TouchEvent) => {
      isDown = true;
      container.classList.add('active');
      startX = e.touches[0].pageX;
      startY = e.touches[0].pageY;
      startScrollLeft = container.scrollLeft;
      setIsDragging(true);
    };
    
    const onTouchEnd = () => {
      isDown = false;
      container.classList.remove('active');
      setIsDragging(false);
    };
    
    const onTouchMove = (e: TouchEvent) => {
      if (!isDown) return;
      
      const x = e.touches[0].pageX;
      const y = e.touches[0].pageY;
      
      // Calculate both horizontal and vertical movements
      const walkX = (x - startX) * 1.5;
      const walkY = y - startY;
      
      // If vertical movement is greater than horizontal, 
      // don't scroll horizontally to allow normal page scrolling
      if (Math.abs(walkY) > Math.abs(walkX)) return;
      
      // Prevent page scrolling when horizontally scrolling the carousel
      e.preventDefault();
      
      container.scrollLeft = startScrollLeft - walkX;
    };
    
    // Wheel event handler for horizontal scrolling
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };
    
    // Add event listeners
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    
    container.addEventListener('touchstart', onTouchStart, { passive: false });
    container.addEventListener('touchend', onTouchEnd);
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    
    container.addEventListener('wheel', onWheel, { passive: false });
    
    return () => {
      clearTimeout(hintTimer);
      
      // Clean up event listeners
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchmove', onTouchMove);
      
      container.removeEventListener('wheel', onWheel);
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section id="products" className="py-20 relative">
      {/* Product Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-xl p-0">
          {selectedProduct && (
            <>
              <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                
                <div className="absolute top-4 right-4 z-10">
                  <DialogClose className="bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full p-2 transition-all duration-200 shadow-lg">
                    <X className="h-5 w-5" />
                  </DialogClose>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">{selectedProduct.name}</h2>
                    <span className="text-xl font-bold text-white bg-sky-600/80 backdrop-blur-sm rounded-full px-4 py-1 shadow-lg">
                      {selectedProduct.price}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-medium mb-3 text-gray-800">About This Product</h3>
                    <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3 text-gray-800">Key Features</h3>
                      <ul className="space-y-2">
                        {selectedProduct.features?.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {selectedProduct.specifications && (
                      <div>
                        <h3 className="text-lg font-medium mb-3 text-gray-800">Technical Specifications</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedProduct.specifications.dimensions && (
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500 min-w-[120px]">Dimensions:</span>
                                <span className="text-gray-700 font-medium">{selectedProduct.specifications.dimensions}</span>
                              </div>
                            )}
                            {selectedProduct.specifications.weight && (
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500 min-w-[120px]">Weight:</span>
                                <span className="text-gray-700 font-medium">{selectedProduct.specifications.weight}</span>
                              </div>
                            )}
                            {selectedProduct.specifications.cellType && (
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500 min-w-[120px]">Cell Type:</span>
                                <span className="text-gray-700 font-medium">{selectedProduct.specifications.cellType}</span>
                              </div>
                            )}
                            {selectedProduct.specifications.certification && (
                              <div className="flex items-start gap-2">
                                <span className="text-gray-500 min-w-[120px]">Certifications:</span>
                                <div className="flex flex-wrap gap-1">
                                  {selectedProduct.specifications.certification.map((cert, index) => (
                                    <Badge key={index} variant="outline" className="bg-white">{cert}</Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="md:border-l md:pl-6 md:border-gray-200">
                    <h3 className="text-lg font-medium mb-4 text-gray-800">Performance</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                        <Zap className="h-5 w-5 text-amber-500" />
                        <div>
                          <p className="text-sm text-gray-500">Wattage</p>
                          <p className="font-medium text-gray-800">{selectedProduct.wattage}</p>
                        </div>
                      </div>
                      
                      {selectedProduct.efficiency && (
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                          <Battery className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="text-sm text-gray-500">Efficiency</p>
                            <p className="font-medium text-gray-800">{selectedProduct.efficiency}</p>
                          </div>
                        </div>
                      )}
                      
                      {selectedProduct.warranty && (
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-500">Warranty</p>
                            <p className="font-medium text-gray-800">{selectedProduct.warranty}</p>
                          </div>
                        </div>
                      )}
                      
                      {selectedProduct.lifespan && (
                        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                          <Clock className="h-5 w-5 text-purple-500" />
                          <div>
                            <p className="text-sm text-gray-500">Lifespan</p>
                            <p className="font-medium text-gray-800">{selectedProduct.lifespan}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 rounded-lg"
                        onClick={() => {
                          setIsModalOpen(false);
                          const contactSection = document.getElementById('contact');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                            // Pre-fill the product name in the form message field
                            const messageTextarea = document.getElementById('message') as HTMLTextAreaElement;
                            if (messageTextarea) {
                              messageTextarea.value = `I'm interested in the ${selectedProduct.name}. Please provide more information about pricing and availability.`;
                              messageTextarea.focus();
                            }
                          }
                        }}
                      >
                        Contact For Quotation
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
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
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none', 
              WebkitOverflowScrolling: 'touch' // Enable smooth scrolling on iOS
            }}
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
                        onClick={() => {
                          setSelectedProduct(panel);
                          setIsModalOpen(true);
                        }}
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