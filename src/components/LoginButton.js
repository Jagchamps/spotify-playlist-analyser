import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const LoginButton = () => {
  const { isLightTheme } = useContext(ThemeContext);

  const scopes = ["user-top-read"];

  return (
    <section className="container login-container">
      <div className="row align-items-center">
        <div className="col">
          <p></p>
          <h2 className="text-center">Login to analyse your Spotify playlists</h2>
          <div className="btn-wrapper">
            <a
              className={`btn btn-${isLightTheme ? "light" : "dark"}`}
              href={`https://accounts.spotify.com/authorize?client_id=${
                process.env.REACT_APP_SPOTIFY_CLIENT_ID
              }&redirect_uri=${
                process.env.REACT_APP_REDIRECT_URI
              }&scope=${scopes.join(
                "%20%"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginButton;
