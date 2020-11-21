import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const PlaylistCard = ({ playlist, selectPlaylist }) => {
  const { isLightTheme } = useContext(ThemeContext);

  const handleClick = async (event) => {
    event.preventDefault();
    selectPlaylist(playlist);
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 pb-3">
      <div
        className="card border-0"
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <div className="card-img-top img-wrapper">
          <img className="square-img" src={playlist.images[0].url} alt={`Cover for playlist ${playlist.name}`}></img>
        </div>
        <div className="card-body">
          <h5 className="card-title playlist-card-title">{playlist.name}</h5>
          <div className="btn-wrapper">
            <button type="button" className={`btn btn-${isLightTheme ? "light" : "dark"}`} onClick={handleClick}>
              Analyse Playlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
