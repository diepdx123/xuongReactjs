import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProductList from "./components/ProductList";
import LayoutClient from "./layouts/LayoutClient";
import AboutPage from "./pages/AboutPage";

function App() {
  // const [product, setProduct] = useState([]);
  // const [currentPage, setcurrentPage] = useState(1);
  // useEffect(() => {
  //   (async () => {
  //     const { data } = await instance.get("/products?_page=1&_per_page=12");
  //     setProduct(data.data);
  //     console.log(data);
  //   })();
  // }, [currentPage]);
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<ProductList />} />
          <Route path="/shop" element={<ProductList />} />

          <Route path="/about" element={<AboutPage />} />

          {/* <Route
            path="/detail-product/:id"
            element={<DetailProductPage data={product} />}
          /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
