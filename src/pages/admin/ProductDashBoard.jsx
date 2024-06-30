import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import instance from "../../axios";

function ProductDashBoard() {
  const { state, dispatch } = useContext(ProductContext);

  const handleRomove = async (id) => {
    if (confirm("ban chac chan xoa?")) {
      await instance.delete(`/products/${id}`);
      dispatch({ type: "DELETE_PRODUCT", payload: id });
    }
  };
  return (
    <>
      <div className="text-gray-900 w-3/4 mr-10 ml-auto m-5">
        <div className="addProcuct">
          <Link
            to="/admin/product-form"
            className="hover:bg-green-600 rounded-lg bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 "
            type="button"
          >
            Thêm Sản phẩm
          </Link>
        </div>

        <div className="px-3 py-4 flex">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">ID</th>
                <th className="text-left p-3 px-5">TITLE</th>
                <th className="text-left p-3 px-5">PRICE</th>
                <th className="text-left p-3 px-5">IMG</th>
                <th className="text-left p-3 px-5">ACTION</th>
              </tr>
              {state.products.map((product) => (
                <tr className="border-b hover:bg-orange-100" key={product.id}>
                  <td className="p-3 px-5">{product.id}</td>
                  <td className="p-3 px-5">{product.title}</td>
                  <td className="p-3 px-5">{product.price}</td>
                  <td className="p-3 px-5">
                    <img src={product.thumbnail} alt="" />
                  </td>
                  <td className="p-3 px-5 flex justify-end">
                    <Link
                      to={`/admin/product-form/${product.id}`}
                      type="button"
                      className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleRomove(product.id)}
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ProductDashBoard;
