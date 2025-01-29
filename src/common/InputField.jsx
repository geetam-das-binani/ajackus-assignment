import React from "react";

const InputField = ({
  labelText,
  type = "text",
  errors,
  name,
  register,
  placeholder,
}) => {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        {...register(name)}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm p-2
        ${
          errors?.[name]
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        }`}
      />
      {errors?.[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </>
  );
};

export default InputField;
