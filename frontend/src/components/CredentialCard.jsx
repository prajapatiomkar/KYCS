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
  console.log(userInfo._id);
  const expandHandle = (id) => {
    navigation(`/user/view-account/${id}`);
  };

  console.log(data);
  return (
    <div className="flex flex-wrap justify-center -m-4">
      {isLoading ? (
        <>Loading...</>
      ) : data?.length == 0 ? (
        <>Add Account Right Now it is Empty</>
      ) : (
        data.map((item, key) => (
          <div className="xl:w-auto md:w-auto w-auto p-4" key={key}>
            <div className="border border-gray-200 px-6 py-5 rounded-lg">
              <div className="flex items-center justify-between mb-3 w-auto ">
                <h2 className="text-lg text-gray-900 font-medium title-font ">
                  {item.title}
                </h2>
                <BsArrowsAngleExpand
                  fontSize={15}
                  color="black"
                  onClick={() => expandHandle(item._id)}
                />
              </div>
              <p className="leading-relaxed text-lg">{item.email}</p>

              <p className="leading-relaxed text-sm">{item.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
