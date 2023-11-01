import React from "react";

function Header() {
  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8">
      <a
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-red-800"
        href="#"
      >
        Task-Management
      </a>
    </div>
  );
}

export default Header;
