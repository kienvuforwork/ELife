"use client";

import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";
import { useState } from "react";
interface InputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  register,
  required,
  errors,
  type,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div className="w-full relative mt-4">
      <div
        className={`border-t-2 ${
          isFocused ? "border-blue-300 w-3/4" : "border-transparent w-0"
        } absolute top-0 right-0 transition-all`}
      ></div>
      <input
        type={type}
        id={id}
        {...register(id, { required })}
        placeholder=""
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`peer  w-full px-4 py-2 bg-elife-700 rounded-sm outline-none transition ${
          isFocused ? "border-blue-300 border-2 border-t-0" : ""
        }
`}
      />
      <label
        className={`absolute text-elife-600 left-5 text-md duration-150 transform -translate-y-8 top-3 z-10 peer-placeholder-shown:scale-110 peer-placeholder-shown:translate-y-0 peer-focus:scale-80 peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:text-blue-600 ${
          errors[id] ? "text-rose-500" : "text-zinc-400"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
