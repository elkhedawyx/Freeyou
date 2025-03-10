import React from "react";

// Posts Icon (Grid)
export const PostsIcon = ({ isActive }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={isActive ? "#000" : "#aaa"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="14" y="2" width="8" height="8" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="2" y="14" width="8" height="8" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="14" y="14" width="8" height="8" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

// Reels Icon
export const ReelsIcon = ({ isActive }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={isActive ? "#000" : "#aaa"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"/>
    <polygon points="8,6 14,12 8,18" fill={isActive ? "#000" : "#aaa"} />
  </svg>
);

// Tagged Icon
export const TaggedIcon = ({ isActive }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={isActive ? "#000" : "#aaa"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="2" y="2" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);