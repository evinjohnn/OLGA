import { Sun, Award, Users } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">About Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              OLGA is Kerala's leading solar energy provider, dedicated to delivering sustainable power solutions for homes and businesses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image side */}
            <div className="relative">
              <div className="bg-sky-100 rounded-lg p-8">
                <img 
                  src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Solar panels installation" 
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
                <div className="absolute -bottom-8 -right-8 bg-sky-600 text-white p-6 rounded-lg shadow-lg">
                  <div className="text-center">
                    <p className="text-4xl font-bold">10+</p>
                    <p className="text-sm">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content side */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Kerala's Premier Solar Provider</h3>
                <p className="text-gray-600">
                  Since 2014, OLGA has been at the forefront of Kerala's renewable energy revolution, helping households and businesses across the state make the transition to clean, sustainable solar power.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-sky-600 mb-3">
                    <Sun size={28} />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Eco-Friendly Solutions</h4>
                  <p className="text-gray-600 text-sm">
                    Our solar solutions have helped reduce carbon emissions by thousands of tons across Kerala.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-sky-600 mb-3">
                    <Award size={28} />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Quality Guaranteed</h4>
                  <p className="text-gray-600 text-sm">
                    We use only the highest quality panels with industry-leading efficiency ratings.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-sky-600 mb-3">
                    <Users size={28} />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Expert Installation</h4>
                  <p className="text-gray-600 text-sm">
                    Our certified technicians ensure perfect installation and optimal performance.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-sky-600 mb-3">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.07 4.93L16.24 7.76M19.07 19.07L16.24 16.24M4.93 19.07L7.76 16.24M4.93 4.93L7.76 7.76" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">Comprehensive Support</h4>
                  <p className="text-gray-600 text-sm">
                    From consultation to maintenance, we provide end-to-end support for all your solar needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-20">
            <div className="text-center p-6 bg-sky-50 rounded-lg">
              <p className="text-4xl font-bold text-sky-600 mb-2">1200+</p>
              <p className="text-gray-700">Installations</p>
            </div>
            
            <div className="text-center p-6 bg-sky-50 rounded-lg">
              <p className="text-4xl font-bold text-sky-600 mb-2">98%</p>
              <p className="text-gray-700">Customer Satisfaction</p>
            </div>
            
            <div className="text-center p-6 bg-sky-50 rounded-lg">
              <p className="text-4xl font-bold text-sky-600 mb-2">25+</p>
              <p className="text-gray-700">Districts Covered</p>
            </div>
            
            <div className="text-center p-6 bg-sky-50 rounded-lg">
              <p className="text-4xl font-bold text-sky-600 mb-2">10MW+</p>
              <p className="text-gray-700">Total Capacity Installed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;