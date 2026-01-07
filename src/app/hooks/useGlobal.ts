import { createContext, useContext } from "react";
import type { User } from "../../libs/data/types/user";

interface GlobalInterface {
  showUserLogin: boolean;
  setShowUserLogin: (input: boolean) => void;
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
  orderBuilder: Date;
  setOrderBuilder: (input: Date) => void;
}

export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined
);

export const useGlobals = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobal must be used in Provider");
  }
  return context;
};
