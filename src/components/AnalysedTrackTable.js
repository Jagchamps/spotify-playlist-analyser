import React from "react";
import AnalysedTrack from "./AnalysedTrack";

const AnalysedTrackTable = ({ analysedTracks, trackFilter }) => {
  return (
    <table className="table table-hover table-borderless">
      <thead>
        <tr>
          <th>{trackFilter}</th>
        </tr>
      </thead>
      <tbody>
        {analysedTracks !== null && Object.keys(analysedTracks).length > 0
          ? analysedTracks.map((analysedTrack) => (
              <AnalysedTrack
                key={analysedTrack.id}
                analysedTrack={analysedTrack}
                trackFilter={trackFilter}
              />
            ))
          : null}
      </tbody>
    </table>
  );
};

export default AnalysedTrackTable;
