import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRouter from "./components/PrivateRouter";
import ProductList from "./components/ProductList";
import LayoutClient from "./layouts/LayoutClient";
import AboutPage from "./pages/AboutPage";
import AuthFormPage from "./pages/AuthFormPage";
import DetailProductPage from "./pages/DetailProductPage";
import ProductDashBoard from "./pages/admin/ProductDashBoard";
import ProductForm from "./pages/admin/ProductForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<ProductList />} />
          {/* <Route path="/shop" element={<ProductList data={product} />} /> */}

          <Route path="/about" element={<AboutPage />} />

          <Route path="/detail-product/:id" element={<DetailProductPage />} />
        </Route>
        <Route path="/login" element={<AuthFormPage />} />
        <Route path="/register" element={<AuthFormPage isRegister />} />

        {/* router admin */}
        <Route path="/admin" element={<PrivateRouter />}>
          <Route path="product-dashboard" element={<ProductDashBoard />} />

          <Route path="product-form" element={<ProductForm />} />
          <Route path="product-form/:id" element={<ProductForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
