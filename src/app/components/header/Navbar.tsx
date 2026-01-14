import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingCart02Icon,
  Search01Icon,
  Location04Icon,
  UserAccountIcon,
  Menu10Icon,
  ArrowDown01Icon,
  GiftIcon,
  Package01Icon,
  Ticket01Icon,
  ChefHatIcon,
  Settings02Icon,
  CustomerSupportIcon,
  Logout01Icon,
  UserIcon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { useGlobals } from "../../hooks/useGlobal";
import { NavLink, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
import { useEffect, useRef, useState } from "react";
import Basket from "./Basket";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openBasket, setOpenBasket] = useState<boolean>(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const {
    authUser,
    setAuthUser,
    setShowUserLogin,
    searchQuery,
    setSearchQuery,
    getCartCount,
  } = useGlobals();
  const navigate = useNavigate();

  // User menu items
  const userMenuItems = [
    {
      icon: UserIcon,
      label: "User Profile",
      onClick: () => {
        navigate("/user");
      },
    },
    {
      icon: Package01Icon,
      label: "My Orders",
      onClick: () => {
        navigate("/user/orders");
      },
    },
    {
      icon: GiftIcon,
      label: "Refer Friends",
      subtitle: "Get free delivery",
      onClick: () => {
        navigate("/user/refer");
      },
      highlight: true,
    },
    {
      icon: Ticket01Icon,
      label: "Coupons",
      onClick: () => {
        navigate("/user/coupons");
      },
    },
    {
      icon: ChefHatIcon,
      label: "My Recipes",
      onClick: () => {
        navigate("/user/recipes");
      },
    },
    {
      icon: Settings02Icon,
      label: "Account Settings",
      onClick: () => {
        navigate("/user/settings");
      },
    },
    {
      icon: CustomerSupportIcon,
      label: "Help Center",
      onClick: () => {
        navigate("/user/help");
      },
    },
  ];

  useEffect(() => {
    // Close element when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (navbarRef && !navbarRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setOpenBasket(false);
      }
    };

    if (open || openBasket) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, openBasket]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const logout = async () => {
    const userService = new UserService();
    await userService.logout();
    localStorage.removeItem("userData");
    setAuthUser(null);
  };

  // Get user tier/badge
  const getUserTier = () => {
    const points = authUser?.userPoints || 0;
    if (points >= 10000) return { name: "Gold", color: "text-yellow-600" };
    if (points >= 5000) return { name: "Silver", color: "text-gray-400" };
    return { name: "Bronze", color: "text-orange-600" };
  };

  const tier = getUserTier();

  return (
    <nav
      ref={navbarRef}
      className={`
        fixed top-0 left-0 right-0 z-50
        flex items-center gap-5 justify-between 
        px-6 md:px-16 lg:px-24 xl:px-32 py-4 
        bg-white/95 backdrop-blur-sm
        border-b border-gray-300
        transition-all duration-300 ease-in-out
        ${scrolled ? "shadow-lg py-3" : "shadow-none py-4"}
      `}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Menu"
        className="sm:hidden"
      >
        <HugeiconsIcon icon={Menu10Icon} />
      </button>

      <div className="flex gap-10">
        <div
          className="hidden md:flex gap-1.5 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/images/logo/logo.svg" alt="logo" className="h-8" />
        </div>

        <div className="sm:hidden md:flex items-center gap-2">
          <button className="flex gap-2">
            <HugeiconsIcon icon={Location04Icon} /> 10115 New York{" "}
            <span className="sm:hidden">
              <HugeiconsIcon icon={ArrowDown01Icon} />
            </span>
          </button>
        </div>
      </div>

      {/* Desktop Search */}
      <div className="hidden min-w-10 w-3xl md:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
        <input
          onChange={(e) => handleSearchQuery(e)}
          className="py-2.5 w-full bg-transparent outline-none placeholder-gray-500"
          type="text"
          placeholder="Search products"
        />
        <HugeiconsIcon icon={Search01Icon} />
      </div>

      <div className="flex items-center gap-8">
        {/* Cart */}
        <div
          className="relative cursor-pointer"
          onClick={() => setOpenBasket((prev) => !prev)}
        >
          <HugeiconsIcon icon={ShoppingCart02Icon} size={21} />
          <button className="absolute -top-2 -right-3 text-xs text-main-text bg-main w-4.5 h-4.5 rounded-full">
            {getCartCount()}
          </button>
          {openBasket && <Basket />}
        </div>

        {/* User Profile / Login */}
        {!authUser ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="hidden md:flex items-center cursor-pointer px-3 gap-2 py-2 bg-main hover:bg-main-dull transition text-main-text rounded-full"
          >
            <HugeiconsIcon icon={UserAccountIcon} size={19} />
            Login
          </button>
        ) : (
          <div className="relative group">
            {/* User Avatar - Hover to show dropdown */}
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                className="w-10 h-10 rounded-full border-2 border-main object-cover hover:opacity-80 transition"
                src={authUser?.userImage}
                alt="user profile"
              />
            </div>

            {/* Dropdown Menu - Shows on hover */}
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute top-14 right-0 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-200 ease-in-out">
              {/* User Info Header */}
              <div className="bg-gradient-to-br from-main/10 to-main-dull/10 p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <img
                    className="w-14 h-14 rounded-full border-2 border-main object-cover"
                    src={authUser?.userImage}
                    alt={authUser?.userNick}
                  />
                  <div className="flex flex-row items-center gap-3 justify-center">
                    <div>
                      <h3 className="font-bold text-main-text text-base">
                        {authUser?.userNick}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className={`flex items-center gap-1 ${tier.color}`}
                        >
                          <HugeiconsIcon icon={StarIcon} size={14} />
                          <span className="text-xs font-semibold">
                            {tier.name}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Points Badge */}
                    <div className="mt-3 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-main/20 rounded-full flex items-center justify-center">
                          <HugeiconsIcon
                            icon={GiftIcon}
                            size={14}
                            color="#e3b609"
                          />
                        </div>
                        <span className="text-sm font-semibold text-main-text">
                          {authUser?.userPoints || 0} Points
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {userMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
                      item.highlight ? "bg-main/5" : ""
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        item.highlight ? "bg-main/20" : "bg-gray-100"
                      }`}
                    >
                      <HugeiconsIcon
                        icon={item.icon}
                        size={18}
                        color={item.highlight ? "#e3b609" : "#6b7280"}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-main-text">
                        {item.label}
                      </p>
                      {item.subtitle && (
                        <p className="text-xs text-main-dull font-medium">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </button>
                ))}

                {/* Logout Button */}
                <div className="border-t border-gray-200 mt-2 pt-2 px-2">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-2 py-2.5 hover:bg-red-50 rounded-lg transition-colors text-left group/logout"
                  >
                    <div className="w-9 h-9 rounded-lg bg-red-50 group-hover/logout:bg-red-100 flex items-center justify-center transition-colors">
                      <HugeiconsIcon
                        icon={Logout01Icon}
                        size={18}
                        color="#ef4444"
                      />
                    </div>
                    <span className="text-sm font-medium text-red-600">
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-15 left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <NavLink to={"/"}>Home</NavLink>
        {authUser && <NavLink to={"/user"}>User Profile</NavLink>}
        <NavLink to={"/contact"}>Contact</NavLink>

        {authUser ? (
          <button
            onClick={() => logout()}
            className="cursor-pointer px-6 py-2 mt-2 bg-main hover:bg-main-dull transition text-main-text rounded-full text-sm"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              console.log("clicked ");
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-main hover:bg-main-dull transition text-main-text rounded-full text-sm"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
