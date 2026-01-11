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
function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin } = useGlobals();
  console.log("rerendering");
  return (
    <div className="min-h-screen text-main-text  text-default">
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
            <Route path="cart" element={<Cart />} />
            <Route path="payment" element={<Payment />} />
            <Route path="addresses" element={<AddressPage />} />
          </Route>
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
}

export default App;
