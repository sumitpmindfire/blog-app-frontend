import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

const AuthContextProvider = ({ children }: { children: JSX.Element }) => {
  const user = Cookies.get("user");
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(user));
  const [userData, setUserData] = useState(user ? JSON.parse(user) : null);

  const logout = () => {
    Cookies.remove("user");
    window.location.pathname = "/login";
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    logout,
  };

  useEffect(() => {
    if (userData) setIsLoggedIn(true);
  }, [userData]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
export { useAuthContext, AuthContext };
