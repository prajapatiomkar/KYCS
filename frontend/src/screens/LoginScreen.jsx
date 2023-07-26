import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/userSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

export default function LoginScreen() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate(`user/${userInfo._id}`);
    }
  }, [userInfo, navigate]);

  const onSubmitHandler = async (data) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <section className="text-gray-600 body-font py-5 lg:py-15">
      <div className="container  py-2 mx-auto flex justify-center  sm:flex-nowrap flex-wrap">
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className=" w-5/6 lg:w-1/3 bg-white flex flex-col border p-6   md:py-8 mt-8 md:mt-0"
        >
          <h2 className="text-gray-900 text-lg mb-1 title-font  text-center">
            Login into your account!
          </h2>

          <div className="relative mb-4 mt-5">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Login
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Not a register user?{" "}
            <Link
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              to="/register"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
