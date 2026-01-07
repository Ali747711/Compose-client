import { GlobalContext } from "../hooks/useGlobal";
import { useState, type ReactNode } from "react";
import Cookies from "universal-cookie";
import type { User } from "../../libs/data/types/user";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookies = new Cookies();

  // If no cookies, remove stored user data
  if (!cookies.get("accessToken")) {
    localStorage.removeItem("userData");
  }

  // GET user from localStorage (persists across page refresh)
  const [authUser, setAuthUser] = useState<User | null>(
    localStorage.getItem("userDate")
      ? JSON.parse(localStorage.getItem("userData") as string)
      : null
  );

  const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
  const [showUserLogin, setShowUserLogin] = useState<boolean>(false);

  console.log("========== Context Provider Initialized =========");
  console.log("Authenticated User:", authUser?.userNick || "None");

  return (
    <GlobalContext.Provider
      value={{
        authUser,
        setAuthUser,
        orderBuilder,
        setOrderBuilder,
        showUserLogin,
        setShowUserLogin,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
