import React, { useState } from "react";

const AnalysedTrack = ({ analysedTrack, trackFilter }) => {
  return (
    <tr>
      <td>
        <div className="progress">
          <div
            className="progress-bar bg-info"
            role="progressbar"
            style={{ width: `${analysedTrack[trackFilter] * 100}%` }}
            aria-valuenow={analysedTrack[trackFilter] * 100}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </td>
    </tr>
  );
};

export default AnalysedTrack;
