import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Login from "./components/auth/Login";
import Home from "./screens/homePage";
import Footer from "./components/footer/Footer";
import Products from "./screens/categoryPage";
import { useGlobals } from "./hooks/useGlobal";
import Product from "./screens/productPage";
function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin } = useGlobals();
  console.log("rerendering");
  return (
    <div className="min-h-screen text-main-text  text-default">
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
}

export default App;
