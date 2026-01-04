import { useLocation } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import { useState } from "react";
import Login from "./components/auth/Login";
function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const [showUserLogin, setShowUserLogin] = useState<boolean>(true);
  return (
    <div className="min-h-screen text-main-text bg-gray-500 text-default">
      {isSellerPath ? null : <Navbar setShowUserLogin={setShowUserLogin} />}
      {showUserLogin ? <Login setShowUserLogin={setShowUserLogin} /> : null}
    </div>
  );
}

export default App;
