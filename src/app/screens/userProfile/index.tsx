import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingCart02Icon,
  Location04Icon,
  CreditCardIcon,
  Package01Icon,
  Notification02Icon,
  GiftIcon,
  Ticket01Icon,
  ChefHatIcon,
  Settings02Icon,
  CustomerSupportIcon,
  Logout01Icon,
} from "@hugeicons/core-free-icons";
import { useGlobals } from "../../hooks/useGlobal";
import { useEffect } from "react";
import ProductService from "../../services/product.service";
import { useDispatch } from "react-redux";
import { setProducts } from "./slice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { authUser, setAuthUser } = useGlobals();
  const navigate = useNavigate();

  const sidebarLinks = [
    { name: "My Orders", path: "/user/orders", icon: Package01Icon },
    { name: "My Cart", path: "/user/cart", icon: ShoppingCart02Icon },
    { name: "My Addresses", path: "/user/addresses", icon: Location04Icon },
    { name: "My Payments", path: "/user/payments", icon: CreditCardIcon },
    {
      name: "Notification Setting",
      path: "/user/notifications",
      icon: Notification02Icon,
    },
    { name: "Refer Friends", path: "/user/refer", icon: GiftIcon },
    { name: "Coupons", path: "/user/coupons", icon: Ticket01Icon },
    { name: "My Recipes", path: "/user/recipes", icon: ChefHatIcon },
    {
      name: "Account Settings",
      path: "/user/settings",
      icon: Settings02Icon,
    },
    { name: "Help Center", path: "/user/help", icon: CustomerSupportIcon },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    setAuthUser(null);
    localStorage.removeItem("userData");
    navigate("/");
  };

  useEffect(() => {
    const productService = new ProductService();

    productService.getAllProducts().then((data) => {
      console.log("Data fetching is successfull in User Profile Page!");
      dispatch(setProducts(data));
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="md:w-72 w-20 bg-white border-r border-gray-200 min-h-screen flex flex-col">
          {/* User Profile Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={authUser?.userImage || "/default-avatar.png"}
                  alt={authUser?.userNick || "User"}
                  className="w-12 h-12 rounded-full object-cover border-2 border-main"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="md:block hidden">
                <h3 className="font-semibold text-main-text text-base">
                  {authUser?.userNick || "Guest User"}
                </h3>
                <p className="text-xs text-gray-500">
                  {authUser?.userEmail || "guest@example.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 py-4">
            {sidebarLinks.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                className={({ isActive }) =>
                  `flex items-center py-3 px-6 gap-4 transition-all duration-200 ${
                    isActive
                      ? "border-r-4 border-main bg-main/5 text-main-text"
                      : "text-gray-600 hover:bg-gray-50 hover:text-main-text"
                  }`
                }
              >
                <HugeiconsIcon
                  icon={item.icon}
                  size={20}
                  className="flex-shrink-0"
                />
                <span className="md:block hidden font-medium text-sm">
                  {item.name}
                </span>
              </NavLink>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center py-3 px-6 gap-4 w-full text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
            >
              <HugeiconsIcon icon={Logout01Icon} size={20} />
              <span className="md:block hidden font-medium text-sm">
                Logout
              </span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
