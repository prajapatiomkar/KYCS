import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  useDeleteCredentialMutation,
  useGetCredentialsByIdQuery,
} from "../slices/credentialSlice";

import { BsArrowLeft } from "react-icons/bs";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

export default function CredentialCardField() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useGetCredentialsByIdQuery(id);
  const [deleteCredentialMutation] = useDeleteCredentialMutation();

  const deleteHandler = async () => {
    try {
      const res = await deleteCredentialMutation(id).unwrap();
      navigate(`/`);
      toast.success(res.message);
    } catch (error) {}
  };


  return (
    <>
      {data && (
        <section className="text-gray-600 body-font py-5 lg:py-15">
          <div className="container  py-2 mx-auto flex justify-center  sm:flex-nowrap flex-wrap">
            <div className=" w-5/6 lg:w-1/3 bg-white flex flex-col border p-6   md:py-8 mt-8 md:mt-0">
              <div
                className="flex items-center mb-1 gap-5"
                onClick={() => navigate("/")}
              >
                <BsArrowLeft />
                <h2 className="text-gray-900 text-lg  title-font  text-left">
                  Back to the page!
                </h2>
              </div>

              <div className="relative mb-4 mt-5">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  value={data.email}
                  // value={}
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
                  value={data.password}
                  type="password"
                  id="password"
                  name="password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="flex gap-5">
                <Link
                  className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  // onClick={() => stateToggler()}
                  to={`/user/edit-account/${id}`}
                >
                  Edit
                </Link>
                <button
                  onClick={deleteHandler}
                  className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
