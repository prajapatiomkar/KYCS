import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { useLogoutMutation } from "../slices/usersApiSlice";

import { useLogoutMutation } from "../slices/userSlice";

import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";

export default function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall, { isLoading }] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigation("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <header className=" text-sm ">
      {userInfo ? (
        <>
          {/* <div className="flex gap-6"> */}
          <div className="flex justify-between p-5 items-center text-sm sm:text-lg">
            <div className="">
              <Link to={`/user/${userInfo._id}`} className=" ">
                KYCS
              </Link>
            </div>
            <div className=" flex gap-4">
              <Link to={`/user/${userInfo._id}`} className="text-gray-700 ">
                Home
              </Link>
              <Link to="/user/add-account" className="text-gray-700">
                Add&nbsp;Account 
              </Link>
              <Link className="text-gray-700 " onClick={logoutHandler}>
                Logout
              </Link>
            </div>
          </div>
          {/* </div> */}
        </>
      ) : (
        <>
          <div className="flex justify-between p-5 items-center text-sm sm:text-lg">
            <div className="">
              <Link to="/" className=" ">
                KYCS
              </Link>
            </div>
            <div className="flex gap-4">
              <Link to="/login" className="text-gray-700 ">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 ">
                Register
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
