import { CheckIcon } from "@/assets/icons";
import layoutImage from "@assets/th.png";

const AboutSection = () => {
  const features = [
    { text: "Quality Products" },
    { text: "Expert Installation" },
    { text: "After-Sales Support" },
    { text: "Kerala-Based Expertise" },
  ];

  const stats = [
    { number: "500+", text: "Installations in Kerala" },
    { number: "10+", text: "Years Experience" },
    { number: "98%", text: "Satisfied Clients" },
    { number: "78%", text: "Conserved Energy" },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-[#1E293B] mb-2">About Us</h2>
          <div className="w-20 h-1 bg-[#008FD5] mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-bold font-montserrat text-[#008FD5] mb-4">
              Leading Solar Energy Provider in Kerala
            </h3>
            <p className="mb-4 text-gray-700">
              OLGA Solar was founded with a mission to make renewable energy accessible to everyone in Kerala. With over a decade of experience in the industry, we have become the leading provider of solar solutions in the state.
            </p>
            <p className="mb-6 text-gray-700">
              Our team of local experts is dedicated to delivering high-quality solar products and exceptional customer service. We understand Kerala's unique climate and energy needs, providing tailored solutions that maximize efficiency and savings for homes and businesses across the state.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#008FD5]/10 flex items-center justify-center text-[#008FD5] mr-3">
                    <CheckIcon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="rounded-lg shadow-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1524519394423-8153ff9e7449?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Solar panels installation in Kerala backwaters"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-[#008FD5]/5 rounded-lg">
              <div className="text-3xl font-bold text-[#008FD5] mb-2">{stat.number}</div>
              <div className="font-medium">{stat.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
