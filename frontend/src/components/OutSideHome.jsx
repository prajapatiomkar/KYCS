import React from "react";
import twofactorauth from "../assets/twofactorauth.svg";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function OutSideHome() {
  return (
    <section className="text-gray-600 body-font text-sm md:mt-6">
      <div className="container mx-auto flex px-5 pt-20 md:flex-row flex-col items-center ">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font text-lg mb-4 md:text-3xl  font-medium text-gray-900">
            Keep Your Credential Safe!
            {/* <br className="hidden lg:inline-block" />
            readymade gluten */}
          </h1>
          <p className="mb-8 leading-relaxed text-sm md:text-lg">
            "Keep Your Credential Safe" is a comprehensive password manager that
            prioritizes security, accessibility, and ease of use. By entrusting
            their login information to this reliable solution, users can
            confidently navigate the digital world while keeping their sensitive
            data out of harm's way.
          </p>
          <div className="flex justify-center text-sm md:text-lg">
            <Link
            to="/login"
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded "
            >
              Login
            </Link>
            <Link to="/register" className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded ">
              Register
            </Link>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded hidden md:block"
            alt="hero"
            src={twofactorauth}
          />
        </div>
      </div>
    </section>
  );
}
