// Base Imports
import React from "react";

// Other Imports
import { PAGE_TITLE } from "../utility/textVariables";

const Header = () => {
  return (
    <div className="flex w-full bg-emerald-300 justify-center p-2">
      <h1 className="uppercase font-extrabold text-3xl my-auto mx-10">{PAGE_TITLE}</h1>
    </div>
  );
};

export default Header;
