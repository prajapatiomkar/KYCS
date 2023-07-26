import React, { useState } from "react";
import CredentialCardField from "./CredentialCardField";
import CredentialCardForm from "./CredentialCardForm";

export default function CredentialWrapper() {
  const [credentialCardToggle, setCredentialsCardToggle] = useState(false);

  const stateToggler = () => {
    setCredentialsCardToggle((prev) => !prev);
  };
  return (
    <div>
      {/* {credentialCardToggle ? (
        <CredentialCardForm stateToggler={stateToggler}  />
      ) : (
        <CredentialCardField stateToggler={stateToggler} />
      )}
      True CredentialCardField False CredentialCardForm */}
      <CredentialCardField/>
    </div>
  );
}
