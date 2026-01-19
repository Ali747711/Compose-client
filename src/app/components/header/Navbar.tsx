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
  Home01Icon,
  ProductLoadingIcon,
  Add01Icon,
} from "@hugeicons/core-free-icons";
import { useGlobals } from "../../hooks/useGlobal";
import { NavLink, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
import { useEffect, useRef, useState } from "react";
import Basket from "./Basket";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter } from "@heroui/react";
import { Address } from "../../../libs/data/types/address";

const Navbar = () => {
  // State management
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openBasket, setOpenBasket] = useState<boolean>(false);
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [addressDrawerOpen, setAddressDrawerOpen] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);

  // Global context
  const {
    authUser,
    setAuthUser,
    setShowUserLogin,
    searchQuery,
    setSearchQuery,
    getCartCount,
    selectedAddress,
    setSelectedAddress,
    addressData,
  } = useGlobals();

  const navigate = useNavigate();

  // ============================================
  // USER MENU CONFIGURATION
  // ============================================
  const userMenuItems = [
    {
      icon: UserIcon,
      label: "User Profile",
      onClick: () => navigate("/user"),
    },
    {
      icon: Package01Icon,
      label: "My Orders",
      onClick: () => navigate("/user/orders"),
    },
    {
      icon: GiftIcon,
      label: "Refer Friends",
      subtitle: "Get free delivery",
      onClick: () => navigate("/user/refer"),
      highlight: true,
    },
    {
      icon: Ticket01Icon,
      label: "Coupons",
      onClick: () => navigate("/user/coupons"),
    },
    {
      icon: ChefHatIcon,
      label: "My Recipes",
      onClick: () => navigate("/user/recipes"),
    },
    {
      icon: Settings02Icon,
      label: "Account Settings",
      onClick: () => navigate("/user/settings"),
    },
    {
      icon: CustomerSupportIcon,
      label: "Help Center",
      onClick: () => navigate("/user/help"),
    },
  ];

  // ============================================
  // EFFECTS
  // ============================================

  // Close dropdowns when clicking outside
  useEffect(() => {
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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigate to products when search query changes
  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleMenuDrawer = () => {
    setMenuDrawerOpen((prev) => !prev);
  };

  const toggleAddressDrawer = () => {
    setAddressDrawerOpen((prev) => !prev);
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    setAddressDrawerOpen(false);
  };

  const handleAddNewAddress = () => {
    navigate("/user/addresses");
    setAddressDrawerOpen(false);
  };

  const logout = async () => {
    const userService = new UserService();
    await userService.logout();
    localStorage.removeItem("userData");
    localStorage.removeItem("addressData");
    setAuthUser(null);
  };

  const handleLogin = () => {
    setMenuDrawerOpen(false);
    setShowUserLogin(true);
  };

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  const getUserTier = () => {
    const points = authUser?.userPoints || 0;
    if (points >= 10000) return { name: "Gold", color: "text-yellow-600" };
    if (points >= 5000) return { name: "Silver", color: "text-gray-400" };
    return { name: "Bronze", color: "text-orange-600" };
  };

  const tier = getUserTier();

  // ============================================
  // RENDER COMPONENTS
  // ============================================

  const renderAddressDrawer = () => (
    <Drawer
      isOpen={addressDrawerOpen}
      placement="bottom"
      onOpenChange={setAddressDrawerOpen}
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerBody>
              <div className="border-t border-gray-200 p-4 lg:p-5">
                {addressData.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500 mb-3">No saved addresses</p>
                    <button
                      onClick={() => {
                        navigate("/user/addresses");
                        onClose();
                      }}
                      className="bg-main hover:bg-main-dull text-main-text font-semibold px-4 py-2 rounded-lg transition-all"
                    >
                      Add Address
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {addressData.map((address: Address) => (
                      <div
                        key={address._id}
                        onClick={() => handleAddressSelect(address)}
                        className={`border-2 rounded-xl p-3 cursor-pointer transition-all ${
                          selectedAddress?._id === address._id
                            ? "border-main bg-main/5"
                            : "border-gray-200 hover:border-main/50 bg-white"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            checked={selectedAddress?._id === address._id}
                            onChange={() => setSelectedAddress(address)}
                            className="mt-1 w-4 h-4 text-main border-gray-300 focus:ring-main cursor-pointer"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-main-text">
                                {address.label}
                              </h3>
                              {address.isDefault && (
                                <span className="px-2 py-0.5 bg-main/20 text-main-text text-xs font-semibold rounded">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {address.street}, {address.city}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.state}, {address.zipcode}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={handleAddNewAddress}
                      className="w-full py-2 text-main-dull hover:text-main-text font-medium text-sm flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-main transition-all"
                    >
                      <HugeiconsIcon icon={Add01Icon} size={18} />
                      Add New Address
                    </button>
                  </div>
                )}
              </div>
            </DrawerBody>
            <DrawerFooter />
          </>
        )}
      </DrawerContent>
    </Drawer>
  );

  const renderMobileMenuDrawer = () => (
    <Drawer
      isOpen={menuDrawerOpen}
      placement="top"
      onOpenChange={setMenuDrawerOpen}
    >
      <DrawerContent>
        {(onClose) => (
          <div className="mt-5">
            <DrawerBody>
              <NavLink
                onClick={onClose}
                to={"/"}
                className="flex gap-1.5 items-center"
              >
                <HugeiconsIcon icon={Home01Icon} fill="#fdd22c" />
                <span>Home</span>
              </NavLink>

              {authUser && (
                <NavLink
                  onClick={onClose}
                  to={"/user"}
                  className="flex gap-1.5 items-center"
                >
                  <HugeiconsIcon icon={UserAccountIcon} fill="#fdd22c" />
                  <span>User Profile</span>
                </NavLink>
              )}

              <NavLink
                onClick={onClose}
                to={"/products"}
                className="flex gap-1.5 items-center text-main-text"
              >
                <HugeiconsIcon icon={ProductLoadingIcon} fill="#fdd22c" />
                <span>See all products</span>
              </NavLink>
            </DrawerBody>

            <DrawerFooter>
              {authUser ? (
                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="cursor-pointer px-6 py-2 mt-2 bg-main hover:bg-main-dull transition text-main-text rounded-full text-sm"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="cursor-pointer px-6 py-2 mt-2 bg-main hover:bg-main-dull transition text-main-text rounded-full text-sm"
                >
                  Login
                </button>
              )}
            </DrawerFooter>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );

  const renderUserDropdown = () => (
    <div className="relative group">
      {/* User Avatar */}
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          className="w-10 h-10 rounded-full border-2 border-main object-cover hover:opacity-80 transition"
          src={authUser?.userImage}
          alt="user profile"
        />
      </div>

      {/* Dropdown Menu */}
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
                  <div className={`flex items-center gap-1 ${tier.color}`}>
                    <HugeiconsIcon icon={StarIcon} size={14} />
                    <span className="text-xs font-semibold">{tier.name}</span>
                  </div>
                </div>
              </div>
              {/* Points Badge */}
              <div className="mt-3 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-main/20 rounded-full flex items-center justify-center">
                    <HugeiconsIcon icon={GiftIcon} size={14} color="#e3b609" />
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
                <HugeiconsIcon icon={Logout01Icon} size={18} color="#ef4444" />
              </div>
              <span className="text-sm font-medium text-red-600">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <>
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
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenuDrawer}
          aria-label="Menu"
          className="sm:hidden"
        >
          <HugeiconsIcon icon={Menu10Icon} />
        </button>

        {/* Logo & Location Section */}
        <div className="flex gap-10">
          {/* Logo */}
          <div
            className="hidden md:flex gap-1.5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src="/images/logo/cup.png" alt="logo" className="h-8" />
          </div>

          {/* Location Selector */}
          <div className="sm:hidden md:flex items-center gap-2">
            <button
              onClick={toggleAddressDrawer}
              className="flex gap-2 items-center hover:text-main-dull transition"
            >
              <HugeiconsIcon icon={Location04Icon} />
              <span>
                {selectedAddress
                  ? `${selectedAddress.zipcode} ${selectedAddress.city}`
                  : "10115 New York"}
              </span>
              <span className="sm:hidden">
                <HugeiconsIcon icon={ArrowDown01Icon} />
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden min-w-10 w-3xl md:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={handleSearchQuery}
            className="py-2.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            value={searchQuery}
          />
          <HugeiconsIcon icon={Search01Icon} />
        </div>

        {/* Right Section: Cart & User */}
        <div className="flex items-center gap-8">
          {/* Desktop Cart */}
          <div
            className="relative cursor-pointer hidden md:flex"
            onClick={() => setOpenBasket((prev) => !prev)}
          >
            <HugeiconsIcon icon={ShoppingCart02Icon} size={21} />
            <span className="absolute -top-2 -right-3 text-xs text-main-text bg-main w-4.5 h-4.5 rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
            {openBasket && <Basket />}
          </div>

          {/* Mobile Cart */}
          <div
            className="sm:hidden cursor-pointer relative"
            onClick={() => navigate("/cart")}
          >
            <HugeiconsIcon icon={ShoppingCart02Icon} size={21} />
            <span className="absolute -top-2 -right-3 text-xs text-main-text bg-main w-4.5 h-4.5 rounded-full flex items-center justify-center">
              {getCartCount()}
            </span>
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
            <div className="hidden md:block">{renderUserDropdown()}</div>
          )}
        </div>
      </nav>

      {/* Drawers */}
      {renderMobileMenuDrawer()}
      {renderAddressDrawer()}
    </>
  );
};

export default Navbar;
