import React from "react";
import CredentialCard from "./CredentialCard";

export default function Home() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-4 mx-auto">
        <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center"></div>
        <CredentialCard />
      </div>
    </section>
  );
}
