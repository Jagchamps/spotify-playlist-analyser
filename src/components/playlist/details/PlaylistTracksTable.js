import React from "react";
import PlaylistTrackRow from "./PlaylistTrackRow";

const PlaylistTracksTable = ({ completeTracks, trackFilter }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Artist</th>
          <th className="d-none d-sm-table-cell" >Album</th>
        </tr>
      </thead>
      <tbody>
        {completeTracks !== null && Object.keys(completeTracks).length > 0
          ? completeTracks.map((completeTrack) => (
              <PlaylistTrackRow
                key={completeTrack.id}
                completeTrack={completeTrack}
                trackFilter={trackFilter}
              />
            ))
          : null}
      </tbody>
    </table>
  );
};

export default PlaylistTracksTable;
