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
import Payment from "./screens/userProfile/Payment";
import UserDetails from "./screens/userProfile/UserDetails";
import AddressPage from "./screens/userProfile/Address";
import NotFound from "./components/page/NotFound";
import CheckoutPage from "./screens/checkoutPage";
import CartPage from "./screens/cart";
import OrderPage from "./screens/orderPage";
import UserOrders from "./screens/userProfile/Order";
import HelpCenter from "./screens/userProfile/HelpCenter";
import MemberPage from "./screens/memberPage";
function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin } = useGlobals();
  // console.log("rerendering");

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
          <Route path="/checkout" element={<CheckoutPage />} />
          {/* <Route path="/menu" element={<Menu />} /> */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/member/:id" element={<MemberPage />} />
          <Route path="/user" element={<UserProfile />}>
            <Route index element={<UserDetails />} />
            <Route path="details" element={<UserDetails />} />
            <Route path="orders" element={<UserOrders />} />
            {/* <Route path="cart" element={<Cart />} /> */}
            <Route path="payments" element={<Payment />} />
            <Route path="addresses" element={<AddressPage />} />
            <Route path="help" element={<HelpCenter />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
}

export default App;
