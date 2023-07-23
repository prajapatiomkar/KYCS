import React from "react";

import Home from "../components/Home.jsx";
import OutSideHome from "./OutSideHome.jsx";
import { useSelector } from "react-redux";

export default function Hero() {
  const { userInfo } = useSelector((state) => state.auth);

  return <>{userInfo ? <Home /> : <OutSideHome />}</>;
}
