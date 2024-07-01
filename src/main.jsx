import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.scss";
import ProductProvider from "./contexts/ProductContext.jsx";
import AuthContextProvider from "./contexts/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
