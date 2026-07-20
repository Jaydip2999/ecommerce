import Navbar from "./components/layout/Navbar";
import "./App.css";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "50px", textAlign: "center" }}>
        <h1>Welcome to ShopEase</h1>
        <p>React Ecommerce Website</p>
      </div>
      <Footer />
    </>
  );
}

export default App;