import { useState } from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingCart02Icon,
  Search01Icon,
  Coffee02Icon,
  Location04Icon,
  UserAccountIcon,
  Menu10Icon,
  ArrowDown01Icon,
} from "@hugeicons/core-free-icons";
import { useGlobals } from "../../hooks/useGlobal";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
interface NavbarProps {
  setShowUserLogin: (input: boolean) => void;
}

const Navbar = (props: NavbarProps) => {
  const { setShowUserLogin } = props;
  const [open, setOpen] = useState<boolean>(false);
  const { authUser, setAuthUser } = useGlobals();
  const navigate = useNavigate();
  // console.log(authUser);

  const logout = async () => {
    const userService = new UserService();
    await userService.logout();
    localStorage.removeItem("userData");
    setAuthUser(null);
  };
  return (
    <nav className="flex items-center gap-5  justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <HugeiconsIcon icon={Menu10Icon} />
      </button>
      <div className="flex gap-10">
        <div className="hidden md:flex gap-1.5">
          <a href="https://prebuiltui.com">Compose</a>
          <HugeiconsIcon icon={Coffee02Icon} />
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
          className="py-2.5 w-full bg-transparent outline-none placeholder-gray-500"
          type="text"
          placeholder="Search products"
        />
        <HugeiconsIcon icon={Search01Icon} />
      </div>
      <div className="flex items-center gap-8">
        <div className=" relative cursor-pointer">
          <HugeiconsIcon icon={ShoppingCart02Icon} size={21} />
          <button className="absolute -top-2 -right-3 text-xs text-main-text bg-main w-4.5 h-4.5 rounded-full">
            3
          </button>
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
          <div className="relative group text-main-text">
            <img
              className="w-12 h-12 rounded-full border-main-dull"
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
        <a href="#" className="block">
          Home
        </a>
        <a href="#" className="block">
          About
        </a>
        <a href="#" className="block">
          Contact
        </a>
        <button
          onClick={() => setShowUserLogin(true)}
          className="cursor-pointer px-6 py-2 mt-2 bg-main hover:bg-main-dull transition text-main-text rounded-full text-sm"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
