import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../axios";
import ReactPaginate from "react-paginate";

function ProductList() {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginatedData, setPaginatedData] = useState([]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products");
      const perPage = 5;
      const offset = currentPage * perPage;
      const paginatedData = data.slice(offset, offset + perPage);
      setPaginatedData(paginatedData);
      console.log(paginatedData);

      setProduct(data);
    })();
  }, [currentPage]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Sản phẩm</h2>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {paginatedData.map((product) => (
            <div
              key={product.id}
              className="group border border-gray-200 rounded-lg overflow-hidden flex flex-col"
            >
              <Link
                to={`/detail-product/${product.id}`}
                className="block w-full h-0 pb-[100%] overflow-hidden bg-gray-200 relative"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="absolute top-0 left-0 w-full h-full object-cover object-center group-hover:opacity-75"
                />
              </Link>
              <div className="mt-auto px-4 py-3 flex justify-between items-end">
                <div>
                  <Link to={`/detail-product/${product.id}`}>
                    <h3 className="text-sm text-gray-700 line-clamp-2">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center justify-center h-10 min-w-[100px]"
                >
                  Mua
                </Link>
              </div>
            </div>
          ))}

          <div>
            {/* Render danh sách dữ liệu */}
            {/* Thanh phân trang */}
            <ReactPaginate
              pageCount={5} // Tổng số trang
              pageRangeDisplayed={2} // Số trang hiển thị trên thanh phân trang
              marginPagesDisplayed={2} // Số trang hiển thị ở hai đầu của thanh phân trang
              previousLabel={
                <span style={{ color: "#007bff" }}>Trang trước</span>
              } // Nhãn trang trước
              nextLabel={<span style={{ color: "#007bff" }}>Trang sau</span>} // Nhãn trang sau
              breakLabel={<span style={{ color: "#6c757d" }}>...</span>} // Nhãn trang ngắt dòng
              onPageChange={handlePageChange} // Callback khi chuyển trang
              containerClassName={"pagination"} // Lớp CSS cho container
              // activeClassName={"active"} // Lớp CSS cho trang hiện tại
              activeLinkClassName={"active-link"} // Lớp CSS cho liên kết trang hiện tại
              pageLinkClassName={"page-link"} // Lớp CSS cho liên kết trang
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
