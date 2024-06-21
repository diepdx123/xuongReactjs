import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import instance from "./axios";
import ProductList from "./components/ProductList";
import LayoutClient from "./layouts/LayoutClient";
import AboutPage from "./pages/AboutPage";
import DetailProductPage from "./pages/DetailProductPage";

function App() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products");
      setProduct(data);
    })();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<ProductList data={product} />} />
          <Route path="/shop" element={<ProductList data={product} />} />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/detail-product/:id" element={<DetailProductPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
