import React, { useContext, useState, useEffect } from "react";
import "./styles/App.scss";
import LoginButton from "./components/LoginButton";
import PlaylistList from "./components/playlist/PlaylistList";
import spotify from "./api/Spotify";
import { TokenContext } from "./contexts/TokenContext";
import Header from "./components/Header";

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

const App = () => {
  const [playlists, setPlaylists] = useState([]);
  const { token, setToken } = useContext(TokenContext);

  useEffect(() => {
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      sessionStorage.setItem("token", _token);
    }

    if (token !== null) {
      console.log("Token effect is being called");
      getPlaylists();
    }
  }, [token]);

  const getPlaylists = async () => {
    const _playlists = await spotify
      .get("/me/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 50,
        },
      })
      .catch((error) => {
        console.log("I fell over for some reason " + error);
        setToken(null);
        sessionStorage.setItem("token", null);
      });

    if (_playlists) {
      setPlaylists(_playlists.data.items);
    }
  };

  return (
    <div className="app">
      <Header />

      {!token && <LoginButton />}
      {token && playlists !== null && Object.keys(playlists).length > 0 ? (
        <PlaylistList playlists={playlists} />
      ) : null}
    </div>
  );
};

export default App;
