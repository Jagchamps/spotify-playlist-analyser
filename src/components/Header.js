import React, { useContext } from "react";
import ThemeToggle from "./ThemeToggle";
import { ThemeContext } from "../contexts/ThemeContext";
import logoLight from "../images/supertonic-light-transparent.png";
import logoDark from "../images/supertonic-dark-transparent.png";

const Header = () => {
  const { isLightTheme } = useContext(ThemeContext);

  return (
    <header className="container mb-5">
      <div className="row justify-content-between align-items-center">
        <div className="col-4">
          <img
            src={isLightTheme ? logoLight : logoDark}
            className="App-logo"
            alt="logo"
          />
        </div>
        <div className="col-md-4 d-none d-md-block">
          <h1 className="text-center">Supertonic</h1>
        </div>
        <div className="col-8 col-md-4 text-right">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
