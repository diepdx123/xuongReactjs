import { createContext, useEffect, useState } from "react";
import instance from "../axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      console.log(token, 2222222);
      // const token = Cookies.get("token");
      if (token) {
        console.log(3333333333);
        try {
          const { data } = await instance.get("/660/users/1", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(data);
          setUser(data);
          setIsAuth(true);
        } catch (error) {
          console.log(error);
          setIsAuth(false);
          setUser(null);
        }
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await instance.post("/login", { email, password });
      localStorage.setItem("token", data.accessToken);
      // Cookies.set("token", data.accessToken, { expires: 3 });
      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
      setUser(null);

      // nem ra loi duoi dang error obj de ben authForm co the bat duoc
      throw new Error(error?.response?.data || "Đăng nhập thất bại");
    }
  };

  const register = async (email, password) => {
    try {
      const { data } = await instance.post("/register", {
        email,
        password,
      });
      localStorage.setItem("token", data.accessToken);
      // Cookies.set("token", data.accessToken, { expires: 3 });
      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
      setUser(null);
      throw new Error(error?.response?.data || "Đăng ki thất bại");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    // Cookies.remove("token");
    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
