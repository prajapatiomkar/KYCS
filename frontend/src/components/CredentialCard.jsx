import React, { useEffect, useState } from "react";

import { BsArrowsAngleExpand } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import datafile from "../../data.json";

import { useGetAllCredentialsQuery } from "../slices/credentialSlice";

import { useDispatch, useSelector } from "react-redux";

export default function CredentialCard() {
  const { userInfo } = useSelector((state) => state.auth);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isError, isSuccess } = useGetAllCredentialsQuery(
    userInfo._id
  );
  const expandHandle = (id) => {
    navigation(`/user/view-account/${id}`);
  };

  return (
    <div className="flex flex-wrap justify-center -m-4 text-sm md:text-lg ">
      {isLoading ? (
        <>Loading...</>
      ) : data?.length == 0 ? (
        <>Add Account Right Now it is Empty</>
      ) : (
        data.map((item, key) => (
          <div className=" xl:w-auto md:w-auto w-auto " key={key}>
            <div className=" border border-gray-200 px-10 m-2 py-5 rounded-lg">
              <div className="flex items-center justify-between flex-wrap   mb-3 w-auto ">
                <h2 className=" text-gray-900 font-medium title-font text-lg md:text-xl ">
                  {item.title}
                </h2>
                <BsArrowsAngleExpand
                  fontSize={15}
                  color="black"
                  onClick={() => expandHandle(item._id)}
                />
              </div>
              <p className="leading-relaxed ">{item.email}</p>

              <p className="leading-relaxed ">{item.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
