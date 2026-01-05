import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import { useState } from "react";
import Login from "./components/auth/Login";
import Home from "./screens/homePage";
import Footer from "./components/footer/Footer";
function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const [showUserLogin, setShowUserLogin] = useState<boolean>(false);
  return (
    <div className="min-h-screen text-main-text  text-default">
      {isSellerPath ? null : <Navbar setShowUserLogin={setShowUserLogin} />}
      {showUserLogin ? <Login setShowUserLogin={setShowUserLogin} /> : null}
      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
}

export default App;
