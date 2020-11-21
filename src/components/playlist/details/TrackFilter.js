import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

const TrackFilter = ({ filter, trackFilter, selectFilter }) => {
  const { isLightTheme } = useContext(ThemeContext);

  const handleClick = async (event) => {
    event.preventDefault();
    selectFilter(filter);
  };

  return (
    <div className="text-center col-6 col-md-3 btn-col">
      <button type="button" className={`btn btn-block btn-${isLightTheme ? "light" : "dark"} ${filter === trackFilter ? "active" : ""}`} onClick={handleClick}>
        {filter}
      </button>
    </div>
  );
};

export default TrackFilter;
