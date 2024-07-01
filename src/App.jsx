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
import NotFoundPage from "./pages/NotFoundPage";
import LayoutAdmin from "./layouts/LayoutAdmin";

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
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route path="product-dashboard" element={<ProductDashBoard />} />
            <Route path="product-form" element={<ProductForm />} />
            <Route path="product-form/:id" element={<ProductForm />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
