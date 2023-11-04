import React from "react";

function InputControl(props) {
  return (
    <div className="flex flex-col space-y-2">
      {props.label && (
        <label className="font-bold text-base text-black">{props.label}</label>
      )}
      <input
        type="text"
        {...props}
        className="rounded-md border border-gray-300 focus:border-red-500 focus:outline-none px-4 py-2 text-black"
      />
    </div>
  );
}

export default InputControl;
