import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import schemaProduct from "../../schema/SchemaProduct";
import instance from "../../axios";
import { ProductContext } from "../../contexts/ProductContext";

const ProductForm = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { dispatch } = useContext(ProductContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(schemaProduct) });

  if (id) {
    useEffect(() => {
      (async () => {
        try {
          const { data } = await instance.get(`/products/${id}`);
          reset(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }, [id]);
  }

  const onSubmit = async (data) => {
    if (id) {
      const res = await instance.patch(`/products/${id}`, data);
      dispatch({ type: "UPDATE_PRODUCT", payload: res.data });
      nav("/admin");
    } else {
      const res = await instance.post("/products", data);
      dispatch({ type: "ADD_PRODUCT", payload: res.data });
      nav("/admin");
    }
    if (confirm("Successfully, redirect to admin page!")) {
      nav("/admin/product-dashboard");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md">
          <div className="text-2xl font-bold text-center m-2 text-blue-500">
            {id ? "Edit Product" : "Add Product"}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                {...register("title", { required: true })}
              />
              {errors.title?.message && (
                <p className="text-danger">{errors.title?.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                price
              </label>
              <input
                className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                {...register("price", { required: true, valueAsNumber: true })}
              />
              {errors.price?.message && (
                <p className="text-danger">{errors.price?.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                description
              </label>
              <input
                className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                type="text"
                {...register("description", { required: true })}
              />
              {errors.description?.message && (
                <p className="text-danger">{errors.description?.message}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {id ? "Product Edit" : "Product Add"}
              </button>
              <Link
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                to="#"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            ©2020 Acme Corp. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
