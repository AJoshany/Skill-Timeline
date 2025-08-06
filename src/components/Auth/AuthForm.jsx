import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useNavigate } from "react-router";

export default function AuthForm() {
  const { login, register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const submitHandler = async (data) => {
    setError(null);

    const email = data.email.trim().toLowerCase();
    const password = data.password.trim();

    if (isLogin) {
      const { error } = await login(email, password);
      if (error) setError(error.message);
      else {
        alert("You have successfully logged in");
        navigate("/dashboard");
      }
    } else {
      const { error } = await registerUser(email, password);
      if (error) setError(error.message);
      else {
        alert("Successful registration");
        navigate("/dashboard");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5 bg-[var(--color-secondary-dark)] w-[90%] min-h-[450px] md:min-w-[350px] md:w-[30%] mx-auto md:h-[60%]  p-5 rounded-tl-[4rem] rounded-br-[4rem] border-l-3 border-l-[var(--color-primary)] border-t-3  border-t-[var(--color-primary)] shadow-[5px_5px_17px_-2px_rgba(0,_0,_0,_0.8)]  border-r-3 border-r-black border-b-3 border-b-black">
        <h2 className="mt-2 mb-2 text-2xl font-bold text-center text-[var(--color-primary)]">
          {isLogin ? "Login Form" : "SignUp Form"}
        </h2>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col justify-between h-full gap-4 font-bold text-gray-400"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="email-input">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                id="email-input"
                className="p-2 font-medium text-white border-gray-500 border-1 rounded-xl text-md"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-[10px] font-normal text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="pass-input">Password</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="w-full p-2 font-medium text-white border-gray-500 border-1 rounded-xl text-md"
                  id="pass-input"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-xl text-gray-500 transform -translate-y-1/2 opacity-50 cursor-pointer right-3 top-1/2 hover:text-gray-700"
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
              {errors.password && (
                <p className="text-[10px] font-normal text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              {/* <p className="mb-4 text-xs text-red-800">
                {error ? `${error}` : ""}
              </p> */}
              <p className="mb-2 text-xs text-red-800">{error}</p>
            </div>

            <button
              type="submit"
              className="w-full py-3 mb-4 bg-[var(--color-primary)]  text-gray-300 hover:text-white transition-all rounded-xl  hover:shadow-md  "
            >
              {isLogin ? "Login" : "Register"}
            </button>
            <div className="flex gap-1 text-xs text-gray-400">
              <p>
                {isLogin ? "Don't have an account?" : "Do you have an account?"}
              </p>
              <a
                href="#"
                className="ml-1 text-cyan-600"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                }}
              >
                {isLogin ? "SignUp" : "Login"}
              </a>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
