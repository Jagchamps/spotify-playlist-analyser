import React, { useState } from "react";
import PlaylistCard from "./PlaylistCard";
import PlaylistDetail from "./details/PlaylistDetail";
import { ThemeContext } from "../../contexts/ThemeContext";

const PlaylistList = ({ playlists }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState();

  const selectPlaylist = (playlist) => {
    console.log(playlist);
    setSelectedPlaylist(playlist);
  };

  const deselectPlaylist = () => {
    setSelectedPlaylist();
  };

  return (
    <div className="background-wrapper">
      <section className="container">
        {selectedPlaylist == null ? (
          <>
            <h2 className="text-center">Playlists</h2>
            <div className="row">
              {playlists.map((a) => (
                <PlaylistCard
                  key={a.id}
                  playlist={a}
                  selectPlaylist={selectPlaylist}
                />
              ))}
            </div>
          </>
        ) : (
          <PlaylistDetail
            selectedPlaylist={selectedPlaylist}
            deselectPlaylist={deselectPlaylist}
          />
        )}
      </section>
    </div>
  );
};

export default PlaylistList;
