import { FC } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ProductsSection from "../components/ProductsSection";
import BlogSection from "../components/BlogSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const Home: FC = () => {
  return (
    <div className="font-sans text-gray-900">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductsSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;