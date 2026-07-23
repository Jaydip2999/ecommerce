import Navbar from "./components/layout/Navbar";
import "./App.css";
import Footer from "./components/layout/Footer";
import Hero from "./components/Home/Hero";
import Categories from "./components/Home/Categories";
import FeaturedProducts from "./components/Home/FeaturedProducts";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Footer />
    </>
  );
}

export default App;