import React from "react";

const SPOTIFY_CLIENT_ID = '5c2f7edf84cb4a85a05d4ad6408b4ecc';

const LoginButton = ({ authEndpoint, redirectUri, scopes }) => {
  return (
    <div>
      <h2>Login to view you Spotify stats</h2>
      <a
        href={`${authEndpoint}?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20%")}&response_type=token&show_dialog=true`}
      >
        Login to Spotify
      </a>
    </div>
  );
}

export default LoginButton;