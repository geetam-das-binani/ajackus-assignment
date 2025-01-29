import { Save } from "lucide-react";
import React from "react";

const Button = ({
  buttonText,
  type = "button",
  navigate,
  isIcon = false,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={() => navigate("/")}
      className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-600
        ${isIcon ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white"}`}
      disabled={disabled}
    >
      {isIcon && <Save className="h-4 w-4 mr-2" />} {buttonText}
    </button>
  );
};

export default Button;
