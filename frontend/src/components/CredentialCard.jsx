import React from "react";

import { BsArrowsAngleExpand } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function CredentialCard() {
  const navigation = useNavigate();
  const expandHandle = () => {
    navigation("/credential");
  };

  return (
    <div className="flex flex-wrap justify-center -m-4">
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg text-gray-900 font-medium title-font ">
              Google
            </h2>
            <BsArrowsAngleExpand
              fontSize={15}
              color="black"
              onClick={() => expandHandle()}
            />
          </div>
          <p className="leading-relaxed text-lg">
            prajapatiomkar9833@gmail.com
          </p>

          <p className="leading-relaxed text-sm">Google Website Account</p>
        </div>
      </div>
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
            Title
          </h2>
          <p className="leading-relaxed text-lg">Account</p>
          <p className="leading-relaxed text-sm">Description</p>
        </div>
      </div>
    </div>
  )
}
