// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      {/* أيقونة الرئيسية: توجه إلى /home */}
      <Link
        to="/home"
        className={`nav-link ${location.pathname === "/home" ? "active" : ""}`}
      >
        <HomeIcon />
      </Link>
      
      {/* أيقونة الاستكشاف */}
      <Link
        to="/explore"
        className={`nav-link ${location.pathname === "/explore" ? "active" : ""}`}
      >
        <ExploreIcon />
      </Link>
      
      {/* أيقونة إنشاء المنشور */}
      <Link
        to="/create"
        className={`nav-link ${location.pathname === "/create" ? "active" : ""}`}
      >
        <CreateIcon />
      </Link>
      
      {/* أيقونة الرسائل */}
      <Link
        to="/direct"
        className={`nav-link ${location.pathname === "/direct" ? "active" : ""}`}
      >
        <DirectIcon />
      </Link>
      
      {/* أيقونة النشاط (القلب) */}
      <Link
        to="/activity"
        className={`nav-link ${location.pathname === "/activity" ? "active" : ""}`}
      >
        <HeartIcon />
      </Link>
      
      {/* أيقونة الملف الشخصي */}
      <Link
        to="/profile"
        className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`}
      >
        <ProfileIcon />
      </Link>
    </nav>
  );
};

function HomeIcon() {
  const iconStyle = { width: "24px", height: "24px" };
  return (
    <svg style={iconStyle} viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor" />
    </svg>
  );
}

function ExploreIcon() {
  const iconStyle = { width: "24px", height: "24px" };
  return (
    <svg style={iconStyle} viewBox="0 0 24 24">
      <path
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.93 6.36l-2.83 2.83 1.06 1.06a1 1 0 0 1 .15 1.32l-1.67 2.89a1 1 0 0 1-1.53.34l-2.64-2.64a1 1 0 0 1-.29-.7l.12-2.96a1 1 0 0 1 1-1 1 1 0 0 1 .7.29l2.64 2.64a1 1 0 0 1 .29.7l-.12 2.96a1 1 0 0 1-1 1 1 1 0 0 1-.7-.29L8.1 9.03a1 1 0 0 1 .15-1.32l2.83-2.83a1 1 0 0 1 1.32 0z"
        fill="currentColor"
      />
    </svg>
  );
}

function CreateIcon() {
  const iconStyle = { width: "24px", height: "24px" };
  return (
    <svg style={iconStyle} viewBox="0 0 24 24">
      <path
        d="M12 5v14m-7-7h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function DirectIcon() {
  const iconStyle = { width: "24px", height: "24px" };
  return (
    <svg style={iconStyle} viewBox="0 0 24 24">
      <path
        d="M22 2L11 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M22 2L15 22L11 13L2 9L22 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function HeartIcon() {
  const iconStyle = { width: "24px", height: "24px" };
  return (
    <svg style={iconStyle} viewBox="0 0 24 24">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
           2 5.42 4.42 3 7.5 3c1.74 0 3.41.81
           4.5 2.09C13.09 3.81 14.76 3 16.5 3
           19.58 3 22 5.42 22 8.5c0 3.78-3.4
           6.86-8.55 11.54L12 21.35z"
        fill="currentColor"
      />
    </svg>
  );
}

function ProfileIcon() {
  const iconStyle = { width: "24px", height: "24px" };
  return (
    <svg style={iconStyle} viewBox="0 0 24 24">
      <path
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
        fill="currentColor"
      />
      <path
        d="M12 14c-4.41 0-8 1.79-8 4v2h16v-2c0-2.21-3.59-4-8-4z"
        fill="currentColor"
      />
    </svg>
  );
}

export default Navbar;