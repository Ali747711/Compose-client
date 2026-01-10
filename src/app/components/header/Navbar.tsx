import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingCart02Icon,
  Search01Icon,
  Location04Icon,
  UserAccountIcon,
  Menu10Icon,
  ArrowDown01Icon,
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
  } = useGlobals();
  const { getCartCount } = useGlobals();
  const navigate = useNavigate();

  useEffect(() => {
    // Close element when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (navbarRef && !navbarRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setOpenBasket(false);
      }
    };
    // Only add listener when menu is open(better performance + avoids bugs)
    if (open || openBasket) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean-up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, openBasket]); // Re-run when open changes

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
        {/* Menu Icon SVG */}
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
          <button className=" flex gap-2">
            <HugeiconsIcon icon={Location04Icon} /> 10115 New York{" "}
            <span className="sm:hidden">
              <HugeiconsIcon icon={ArrowDown01Icon} />
            </span>
          </button>
        </div>
      </div>

      {/* Desktop Menu */}

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
        <div
          className=" relative cursor-pointer"
          onClick={() => setOpenBasket((prev) => (prev ? false : true))}
        >
          <HugeiconsIcon icon={ShoppingCart02Icon} size={21} />
          <button className="absolute -top-2 -right-3 text-xs text-main-text bg-main w-4.5 h-4.5 rounded-full">
            {getCartCount()}
          </button>
          {openBasket && <Basket />}
        </div>

        {!authUser ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className=" hidden md:flex items-center cursor-pointer px-3 gap-2 py-2 bg-main hover:bg-main-dull transition text-main-text rounded-full"
          >
            <HugeiconsIcon icon={UserAccountIcon} size={19} />
            Login
          </button>
        ) : (
          <div
            onClick={() => navigate("/user")}
            className="relative group text-main-text cursor-pointer"
          >
            <img
              className="w-12 h-12 rounded-full border-2 border-main object-cover "
              src={authUser?.userImage}
              alt="user profile image"
            />

            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li
                onClick={() => navigate("my-orders")}
                className="p-1.5 pl-3 hover:bg-main/10 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={() => logout()}
                className="p-1.5 pl-3 hover:bg-main/10 cursor-pointer"
              >
                Logout
              </li>
            </ul>
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
        <NavLink to={"/about"}>About</NavLink>
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
