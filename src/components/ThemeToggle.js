import React, { useContext } from "react";
import { ThemeContext } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isLightTheme, toggleTheme } = useContext(ThemeContext);

  const handleClick = async (event) => {
    event.preventDefault();
    document.body.classList.toggle("dark");
    toggleTheme();
  };

  return (
    <button type="button" className={`btn btn-sm btn-outline-${isLightTheme ? "light" : "dark"}`} onClick={handleClick}>
      Night Mode
    </button>
  );
};

export default ThemeToggle;
