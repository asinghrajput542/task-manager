import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Header component that displays the application name, user information, and logout button.
function Header(props) {
  // State to track if the user avatar is clicked.
  const [isAvatarClicked, setAvatarClicked] = useState(false);
  const navigate = useNavigate();
  const { isHome, name, email } = props;

  // Function to toggle the visibility of user information dropdown.
  const handleAvatarClick = () => {
    setAvatarClicked(!isAvatarClicked);
  };

  // Function to handle user logout.
  const handleLogout = () => {
    // Get the authentication instance from Firebase.
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Redirect to the home page after successful logout.
        navigate("/");
      })
      .catch((error) => {
        // Display an error message if logout fails.
        alert("Unable to logout due to some issue. Please try again.");
        console.log(error.message);
      });
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 flex flex-col sm:flex-row justify-between items-center">
      <a className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-red-800">
        Task-Manager
      </a>
      {isHome && (
        <div onClick={handleAvatarClick} className="relative mt-4 sm:mt-0">
          {/* User avatar icon */}
          <UserOutlined className="text-4xl sm:text-5xl bg-red-200 p-2 rounded-full cursor-pointer" />
          {isAvatarClicked && (
            // Dropdown with user information and logout button
            <div className="z-50 absolute right-0 top-16 sm:top-14 bg-white shadow-md rounded-lg p-4">
              <p className="text-sm text-gray-600">Name</p>
              <p className="text-lg font-semibold">{name}</p>
              <p className="text-sm text-gray-600 mt-2">Email</p>
              <p className="text-lg font-semibold">{email}</p>
              <button
                onClick={handleLogout}
                className="mt-4 p-2 px-4 bg-red-500 text-white rounded-lg hover-bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
