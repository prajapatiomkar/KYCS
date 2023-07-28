import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import {
  useUpdateCredentialMutation,
  useGetCredentialsByIdQuery,
} from "../slices/credentialSlice";

export default function EditAccount() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const { id } = useParams();
  const [credentialMutation] = useUpdateCredentialMutation();

  const { data, isLoading } = useGetCredentialsByIdQuery(id);
  const [showPasswordToggler, setShowPasswordToggler] = useState(false);

  const onSubmitHandler = async (data) => {
    data = { ...data, _id: id };
    if (data) {
      try {
        await credentialMutation(data).unwrap();
        navigate("/");
        toast.success("Account Edited Successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      toast.error("Please Fill All Fields");
    }
  };

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("email", data.email);
      setValue("url", data.url);
      setValue("password", data.password);
      setValue("description", data.description);
      setValue("userid", data.userid);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <section className="text-gray-600 body-font py-5 lg:py-15">
          <div className="container  py-2 mx-auto flex justify-center  sm:flex-nowrap flex-wrap">
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className=" w-5/6 lg:w-1/3 bg-white flex flex-col border p-6   md:py-8 mt-8 md:mt-0"
            >
              <h2 className="text-gray-900 text-lg mb-1  title-font  text-center">
                Edit Account!
              </h2>

              <div className="relative mb-4 ">
                <label
                  htmlFor="title"
                  className="leading-7 text-sm text-gray-600"
                >
                  Title
                </label>
                <input
                  {...register("title")}
                  type="text"
                  id="title"
                  name="title"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4 ">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
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
              <div className="relative mb-4 ">
                <label
                  htmlFor="url"
                  className="leading-7 text-sm text-gray-600"
                >
                  URL
                </label>
                <input
                  {...register("url")}
                  type="text"
                  id="url"
                  name="url"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4 ">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  Password
                </label>
                <div className="flex items-center gap-6">
                  <input
                    {...register("password")}
                    type={showPasswordToggler ? "text" : "password"}
                    // value={data.password}
                    id="password"
                    name="password"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <div
                    className=""
                    onClick={() => {
                      setShowPasswordToggler((prev) => !prev);
                    }}
                  >
                    {showPasswordToggler ? (
                      <AiOutlineEyeInvisible size={25} />
                    ) : (
                      <AiOutlineEye size={25} />
                    )}
                  </div>
                </div>
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="description"
                  className="leading-7 text-sm text-gray-600"
                >
                  Description
                </label>
                <textarea
                  {...register("description")}
                  type="text"
                  id="description"
                  name="description"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Save
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
