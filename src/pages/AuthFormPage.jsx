import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../axios/index";
import { loginSchema, registerSchema } from "../schema/SchemaAuth";
import { useForm } from "react-hook-form";

function AuthFormPage({ isRegister }) {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit = (data) => {
    (async () => {
      try {
        if (isRegister) {
          await instance.post(`/register`, data);
          nav("/login");
        } else {
          const result = await instance.post(`/login`, data);
          localStorage.setItem("users", JSON.stringify(result.data));
          nav("/");
        }
      } catch (error) {
        alert(error?.response?.data);
      }
    })();
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <div className="text-2xl font-bold text-center m-2 text-blue-500">
          {isRegister ? "Đăng Ký" : "Đăng Nhập"}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {isRegister && (
            <div className="mb-6">
              <label
                htmlFor="confirmPass"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                User Name
              </label>
              <input
                type="text"
                className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="userName"
                {...register("userName", { required: true })}
              />
              {errors.userName?.message && (
                <p className="text-danger">{errors.userName?.message}</p>
              )}
            </div>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email?.message && (
              <p className="text-danger">{errors.email?.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              {...register("password", { required: true })}
            />
            {errors.password?.message && (
              <p className="text-danger">{errors.password?.message}</p>
            )}
          </div>
          {isRegister && (
            <div className="mb-6">
              <label
                htmlFor="confirmPass"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm password
              </label>
              <input
                type="password"
                className="shadow appearance-none  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPass"
                {...register("confirmPass", { required: true })}
              />
              {errors.confirmPass?.message && (
                <p className="text-danger">{errors.confirmPass?.message}</p>
              )}
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isRegister ? "Đăng Ký" : "Đăng Nhập"}
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
  );
}

export default AuthFormPage;
