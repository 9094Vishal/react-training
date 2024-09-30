import React, { useId } from "react";

const Input = ({ label, props, error }) => {
  const id = useId();

  return (
    <div className=" flex gap-2 text-start">
      <label htmlFor="id" className="w-40">
        {label}
      </label>
      <div>
        <input id="id" {...props} />
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );
};

export default Input;
