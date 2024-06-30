import { createContext, useEffect, useReducer } from "react";
import { ProductReducer } from "../reducers/ProductReducer";
import instance from "../axios";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, { products: [] });
  useEffect(() => {
    const fetchAPI = async () => {
      const { data } = await instance.get("/products");
      dispatch({ type: "SET_PRODUCTS", payload: data });
    };
    fetchAPI();
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
