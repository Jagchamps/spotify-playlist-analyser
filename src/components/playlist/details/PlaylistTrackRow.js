import React from "react";

const PlaylistTrackRow = ({ completeTrack, trackFilter }) => {

  const artistNames = completeTrack.artists.map((artist) => artist.name);

  return (
    <tr>
      <td>{completeTrack.number}</td>
      <td>{completeTrack.name}</td>
      <td>{artistNames.join(", ")}</td>
      <td className="d-none d-sm-table-cell" >{completeTrack.album.name}</td>
    </tr>
  );
};

export default PlaylistTrackRow;
