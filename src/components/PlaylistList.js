import React, { useState } from "react";
import PlaylistCard from "./PlaylistCard";
import PlaylistDetail from "./PlaylistDetail";

const PlaylistList = ({ playlists }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState();

  const selectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
  }

  const deselectPlaylist = () => {
    setSelectedPlaylist();
  }

  return (
    <div>
      <h2>Playlists</h2>
      {selectedPlaylist == null ? (
        playlists.map((a) => <PlaylistCard key={a.id} playlist={a} selectPlaylist={selectPlaylist} />)
      ) : (
        <PlaylistDetail selectedPlaylist={selectedPlaylist} deselectPlaylist={deselectPlaylist} />
      )}
    </div>
  );
};

export default PlaylistList;
