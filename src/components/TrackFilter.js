import React from "react";

const TrackFilter = ({ filter, selectFilter }) => {
  const handleClick = async (event) => {
    event.preventDefault();
    selectFilter(filter);
  };

  return <h2 className="col-2" onClick={handleClick}>{filter}</h2>;
};

export default TrackFilter;
