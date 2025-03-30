import React from 'react';
import { ExternalLink, TrendingUp, Sun, Zap, IndianRupee, BarChart3, LightbulbIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  title: string;
  content: string;
  icon: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  color?: 'blue' | 'amber' | 'green' | 'fuchsia' | 'orange';
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  title, 
  content, 
  icon, 
  size = 'medium',
  color = 'blue',
  className = ''
}) => {
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 row-span-2',
    large: 'col-span-2 row-span-2',
  };
  
  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-50 to-sky-100 border-blue-200',
    amber: 'bg-gradient-to-br from-amber-50 to-yellow-100 border-amber-200',
    green: 'bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200',
    fuchsia: 'bg-gradient-to-br from-fuchsia-50 to-purple-100 border-fuchsia-200',
    orange: 'bg-gradient-to-br from-orange-50 to-amber-100 border-orange-200',
  };
  
  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-xl p-6 border backdrop-blur-sm hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between bento-item group ${className}`}>
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-xl text-gray-800 group-hover:text-blue-700 transition-colors">{title}</h3>
          <div className="text-blue-600 p-2 rounded-full bg-white/80 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:rotate-12 transition-all duration-300">
            {icon}
          </div>
        </div>
        <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{content}</p>
      </div>
      
      <Button variant="ghost" size="sm" className="self-start mt-4 text-blue-600 group-hover:text-blue-700 group-hover:bg-blue-50/50">
        Learn more <ExternalLink className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

const BlogSection = () => {
  const blogPosts = [
    {
      title: "30% Tax Benefits",
      content: "The Indian government offers up to 30% subsidy on solar installations, making it significantly more affordable for homeowners.",
      icon: <IndianRupee className="h-5 w-5" />,
      size: "medium" as const,
      color: "blue" as const
    },
    {
      title: "ROI in 3-5 Years",
      content: "Most solar panel installations in India pay for themselves within 3-5 years, offering decades of free electricity afterward.",
      icon: <TrendingUp className="h-5 w-5" />,
      size: "medium" as const,
      color: "green" as const
    },
    {
      title: "300+ Sunny Days",
      content: "India enjoys over 300 sunny days per year, making it one of the best countries for solar energy generation and efficiency.",
      icon: <Sun className="h-5 w-5" />,
      size: "large" as const,
      color: "amber" as const
    },
    {
      title: "Net Metering Benefits",
      content: "Many Indian states offer net metering, allowing you to sell excess electricity back to the grid.",
      icon: <Zap className="h-5 w-5" />,
      size: "small" as const,
      color: "orange" as const
    },
    {
      title: "80% Energy Bill Reduction",
      content: "The average household in Kerala can reduce their electricity bills by up to 80% with proper solar installation.",
      icon: <BarChart3 className="h-5 w-5" />,
      size: "medium" as const,
      color: "fuchsia" as const
    },
    {
      title: "Carbon Footprint Reduction",
      content: "A typical 5kW solar system in India prevents about 5 tons of carbon emissions annually.",
      icon: <LightbulbIcon className="h-5 w-5" />,
      size: "small" as const,
      color: "green" as const
    }
  ];

  // Shuffle array to create a more random-looking layout each time
  const shuffledPosts = [...blogPosts].sort(() => Math.random() - 0.5);

  return (
    <section id="blog" className="py-20 relative overflow-hidden bento-bg-pattern">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 relative inline-block">
            Solar Savings in India
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500"></span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mt-6 text-lg">
            Discover the financial and environmental benefits of switching to solar energy in Kerala and across India
          </p>
        </div>
        
        {/* Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto bento-grid">
          {shuffledPosts.map((post, index) => (
            <BlogCard
              key={index}
              title={post.title}
              content={post.content}
              icon={post.icon}
              size={post.size}
              color={post.color}
            />
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg text-lg">
            Get a Free Solar Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;