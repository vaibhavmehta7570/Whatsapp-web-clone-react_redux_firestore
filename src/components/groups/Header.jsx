import React from "react";

function Header({ heading, handleGoBack }) {
  return (
    <header className="profile-header">
      <div className="profile-header-content">
        <div className="left-arrow mr-2" onClick={handleGoBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="currentColor"
              d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"
            ></path>
          </svg>
        </div>
        <div className="header-title">{heading}</div>
      </div>
    </header>
  );
}

export default Header;
