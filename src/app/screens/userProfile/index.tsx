import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  User02Icon,
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
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { useGlobals } from "../../hooks/useGlobal";
import { useEffect, useState } from "react";
import ProductService from "../../services/product.service";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setUserAddresses,
  setUserDetails,
  setUserOrders,
  setUserPayments,
} from "./slice";
import { Avatar, Spinner } from "@heroui/react";
import UserService from "../../services/user.service";
import { retrieveUserDetails } from "./selector";
const UserProfile = () => {
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { authUser, setAuthUser } = useGlobals();
  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = useSelector(retrieveUserDetails);
  console.log(userDetails);

  const sidebarLinks = [
    { name: "User details", path: "/user", icon: User02Icon },
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
    setAuthUser(null);
    localStorage.removeItem("userData");
    navigate("/");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoadingUser(true);
        const userService = new UserService();
        const data = await userService.getUserDetails();
        // console.log("Fetched user Details: ", data?.userAddresses);

        dispatch(setUserDetails(data));

        if (data.userAddresses) {
          // console.log(data?.userAddresses);
          dispatch(setUserAddresses(data?.userAddresses));
        }
        if (data.userPayments) {
          dispatch(setUserPayments(data?.userPayments));
        }
        if (data.userOrders) {
          dispatch(setUserOrders(data?.userOrders));
        }

        setIsLoadingUser(false);
      } catch (error: any) {
        console.error("Failed to fetch User Details! Error: ", error);
        setError(error?.message);
        setIsLoadingUser(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const productService = new ProductService();
        const data = await productService.getAllProducts();

        // console.log("✅ Products fetched:", data.length);
        dispatch(setProducts(data));
      } catch (error: any) {
        // console.error("Failed to fetch Products! Error: ", error);
        setError(error?.message);
        setIsLoadingUser(false);
      }
    };

    fetchUserData();
    fetchProducts();
  }, [dispatch]);

  // Check if we're on a sub-route (mobile should show content, not menu)
  const isSubRoute = location.pathname !== "/user";

  if (isLoadingUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Spinner color="warning" label="Loading ..." size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-main text-main-text rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:flex">
        {/* Desktop Sidebar - Always visible */}
        <aside className="hidden lg:flex max-w-40 bg-white border-r border-gray-200 min-h-screen flex-col">
          {/* User Profile Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col items-start gap-3">
              <div className="relative">
                <Avatar
                  isBordered
                  color="warning"
                  src={authUser?.userImage}
                  size="lg"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <div>
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
                <span className="font-medium text-sm">{item.name}</span>
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
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile: Show Menu List OR Content (not both) */}
        <div className="lg:hidden w-full">
          {!isSubRoute ? (
            // Mobile Menu List (when on /user route)
            <div className="bg-white min-h-screen">
              {/* User Profile Section */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={authUser?.userImage || "/default-avatar.png"}
                      alt={authUser?.userNick || "User"}
                      className="w-16 h-16 rounded-full object-cover border-2 border-main"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-main-text text-lg">
                      {authUser?.userNick || "Guest User"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {authUser?.userEmail || "guest@example.com"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="py-2">
                {sidebarLinks.map((item) => (
                  <NavLink
                    to={item.path}
                    key={item.name}
                    className="flex items-center justify-between py-4 px-6 border-b border-gray-100 active:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-main/10 rounded-full flex items-center justify-center">
                        <HugeiconsIcon
                          icon={item.icon}
                          size={20}
                          color="#e3b609"
                        />
                      </div>
                      <span className="font-medium text-main-text">
                        {item.name}
                      </span>
                    </div>
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={20}
                      color="#9ca3af"
                    />
                  </NavLink>
                ))}
              </nav>

              {/* Logout Button */}
              <div className="p-6">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center py-3 px-6 gap-3 w-full text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 font-medium"
                >
                  <HugeiconsIcon icon={Logout01Icon} size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            // Mobile Content (when on sub-route like /user/cart)
            <Outlet />
          )}
        </div>

        {/* Desktop Main Content */}
        <main className="hidden lg:block lg:flex-1 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
