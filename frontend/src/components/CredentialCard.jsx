import React, { useEffect, useState } from "react";

import { BsArrowsAngleExpand } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import datafile from "../../data.json";

import { useGetAllCredentialsQuery } from "../slices/credentialSlice";

import { useDispatch } from "react-redux";

export default function CredentialCard() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isError, isSuccess } = useGetAllCredentialsQuery();

  const expandHandle = (id) => {
    navigation(`/credential/${id}`);
  };

  return (
    <div className="flex flex-wrap justify-center -m-4">
      {data &&
        data.map((item, key) => (
          <div className="xl:w-1/3 md:w-1/2 p-4" key={key}>
            <div className="border border-gray-200 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
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
        ))}
    </div>
  );
}
