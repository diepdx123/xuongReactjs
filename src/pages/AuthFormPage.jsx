import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { loginSchema, registerSchema } from "../schema/SchemaAuth";

function AuthFormPage({ isRegister }) {
  const nav = useNavigate();
  const { login, register: registerUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (isRegister) {
        await registerUser(data.email, data.password, data.userName);
        if (confirm("Successfully, redirect to login page?")) {
          nav("/login");
        }
      } else {
        await login(data.email, data.password);
        if (confirm("Successfully, redirect to admin page?")) {
          nav("/");
        }
      }
    } catch (error) {
      alert(error.message);
    }
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
                htmlFor="userName"
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
              {errors.userName && (
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
            {errors.email && (
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
            {errors.password && (
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
              />
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
