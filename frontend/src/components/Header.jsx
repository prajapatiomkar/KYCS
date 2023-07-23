import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
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
    <header className="">
      <div className="flex justify-between p-5 items-center text-lg">
        <Link className=" ">KYCS</Link>
        <div className="flex gap-6">
          {userInfo ? (
            <>
              <Link to="/" className="text-gray-700 ">
                Home
              </Link>
              <Link className="text-gray-700 " onClick={logoutHandler}>
                logout
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 ">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 ">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
