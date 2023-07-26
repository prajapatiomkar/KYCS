import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useRegisterMutation } from "../slices/userSlice";

export default function RegisterScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerMutation, { isLoading }] = useRegisterMutation();

  const onSubmitHandler = async (data) => {
    if (data.password !== data.confirmpassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await registerMutation(data).unwrap();
        dispatch(setCredentials(res));
        navigate("/");
        toast.success("Registered Successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  useEffect(  () => {
    if (userInfo) {
      navigate(`/user/${userInfo._id}`);
    }
  }, [navigate, userInfo]);
  return (
    <section className="text-gray-600 body-font py-5 lg:py-15">
      <div className="container  py-2 mx-auto flex justify-center  sm:flex-nowrap flex-wrap">
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className=" w-5/6 lg:w-1/3 bg-white flex flex-col border p-6   md:py-8 mt-8 md:mt-0"
        >
          <h2 className="text-gray-900 text-lg mb-1  title-font  text-center">
            Register yourself!
          </h2>
          <div className="relative mb-4 mt-5">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4 ">
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
          <div className="relative mb-4">
            <label
              htmlFor="confirmpassword"
              className="leading-7 text-sm text-gray-600"
            >
              Confirm Password
            </label>
            <input
              {...register("confirmpassword")}
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Register
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Already a user?{" "}
            <Link
              className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              to="/login"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
