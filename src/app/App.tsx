import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Login from "./components/auth/Login";
import Home from "./screens/homePage";
import Footer from "./components/footer/Footer";
import { useGlobals } from "./hooks/useGlobal";
// import Product from "./screens/productPage";
// import Category from "./screens/categoryPage/categories";
import CategoryPage from "./screens/categoryPage";
import Product from "./screens/productPage";
import AllProducts from "./screens/productPage/AllProducts";
import UserProfile from "./screens/userProfile";
import Cart from "./screens/userProfile/Cart";
import Payment from "./screens/userProfile/Payment";
import UserDetails from "./screens/userProfile/UserDetails";
import AddressPage from "./screens/userProfile/Address";
import NotFound from "./screens/NotFound";
function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin } = useGlobals();
  console.log("rerendering");

  // // ✅ Debug mobile issues
  // useEffect(() => {
  //   // Log environment info on mobile
  //   const debugInfo = {
  //     userAgent: navigator.userAgent,
  //     platform: navigator.platform,
  //     apiUrl: import.meta.env.VITE_API_URL,
  //     hasLocalStorage: typeof localStorage !== "undefined",
  //     cookiesEnabled: navigator.cookieEnabled,
  //     isOnline: navigator.onLine,
  //   };

  //   console.log("🔍 Debug Info:", debugInfo);

  //   // Test localStorage
  //   try {
  //     localStorage.setItem("test", "test");
  //     localStorage.removeItem("test");
  //     console.log("✅ localStorage working");
  //   } catch (e) {
  //     console.error("❌ localStorage NOT working:", e);
  //   }

  //   // Test API connection
  //   fetch(`${import.meta.env.VITE_API_URL}/health/health`)
  //     .then((res) => res.json())
  //     .then((data) => console.log("✅ API Health Check:", data))
  //     .catch((err) => console.error("❌ API Health Check Failed:", err));
  // }, []);
  return (
    <div className="min-h-screen text-main-text">
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <div
        className={`${
          isSellerPath ? "" : "mt-20 px-6 md:px-16 lg:px-24 xl:px-32"
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<CategoryPage />} />
          <Route path="/products/:category/:id" element={<Product />} />
          <Route path="/user" element={<UserProfile />}>
            <Route index element={<UserDetails />} />
            <Route path="details" element={<UserDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="payments" element={<Payment />} />
            <Route path="addresses" element={<AddressPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
}

export default App;
