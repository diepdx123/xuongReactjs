import { Children, createContext, useEffect, useState } from "react";
import instance from "../axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data } = await instance.get("/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
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
      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
      setUser(null);
      throw new Error(error?.response?.data || "Đăng nhập thất bại");
    }
  };

  const register = async (email, password, userName) => {
    try {
      const { data } = await instance.post("/register", {
        email,
        password,
        userName,
      });
      localStorage.setItem("token", data.accessToken);
      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
      setUser(null);
      // nem ra loi duoi dang error obj de ben authForm co the bat duoc
      throw new Error(error?.response?.data || "Đăng ki thất bại");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
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
