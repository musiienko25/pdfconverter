import React from "react";

const Input = ({ value, onChange }) => {
  return (
    <input
      className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent m-2"
      value={value}
      onChange={onChange}
      placeholder="Type something..."
      type="text"
    />
  );
};

export default Input;
