"use client";

//hooks
import React, { useState } from "react";

// icons
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

// type
import { InputFieldProps } from "@/types";
const InputField: React.FC<InputFieldProps> = ({
  onBlur,
  onChange,
  errors,
  touched,
  id,
  name,
  icon,
  type,
  placeholder,
  value,
  disabled,
  label,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col gap-1 ">
      {label ? (
        <label htmlFor={id} className=" text-[#000000] font-[400]">
          {label}
        </label>
      ) : null}
      <div className="flex flex-col input-container">
        <div
          className={`
          input-wrapper w-full flex gap-x-2 items-center p-2,
          ${disabled ? "bg-[#F9FAFA] hover:pointer-events-none" : ""}`}
          style={{ borderColor: errors && touched ? "red" : "" }}
        >
          {icon ? (
            <label htmlFor={id} className="icon">
              {icon}
            </label>
          ) : null}
          <input
            className="w-full border-none outline-none"
            type={showPassword ? "text" : type ? type : "text"}
            id={id}
            name={name}
            placeholder={placeholder ? placeholder : "Enter....."}
            onBlur={onBlur}
            onChange={onChange}
            value={value ? value : ""}
            disabled={disabled}
          />
          {type === "password" ? (
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? (
                <IoEyeOffOutline size={22} color="gray" />
              ) : (
                <IoEyeOutline size={22} color="gray" />
              )}
            </span>
          ) : null}
        </div>
      </div>
      {errors && touched ? (
        <p className="text-sm text-red-500">{errors}</p>
      ) : null}
    </div>
  );
};

export default InputField;
