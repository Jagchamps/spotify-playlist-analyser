import React, { useContext, useEffect, useState } from "react";
import spotify from "../api/Spotify";
import { TokenContext } from "../context/TokenContext";
import useDidMountEffect from "../hooks/useDidMountEffect";
import AnalysedTrackTable from "./AnalysedTrackTable";
import TrackFilter from "./TrackFilter";

const filters  = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'valence']

const PlaylistDetail = ({ selectedPlaylist, deselectPlaylist }) => {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [analysedTracks, setAnalysedTracks] = useState([]);
  const [trackFilter, setTrackFilter] = useState('acousticness');
  const { token } = useContext(TokenContext);

  const handleClick = async (event) => {
    event.preventDefault();
    deselectPlaylist();
  }

  const selectFilter = (trackFilter) => {
    setTrackFilter(trackFilter);
  }

  useEffect(() => {
    getPlaylistTracks();
  }, []);

  const getPlaylistTracks = async () => {
    const _playlistTracks = await spotify
      .get(selectedPlaylist.tracks.href, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.log("I fell over for some reason " + error);
        sessionStorage.setItem("token", null);
      });

    setPlaylistTracks(_playlistTracks.data.items);
  }

  useDidMountEffect(() => {
    const getAudioFeatures = async () => {
      const ids = [];

      playlistTracks.forEach((track) => {
        ids.push(track.track.id);
      });

      const _analysedTracks = await spotify
        .get("audio-features", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            ids: ids.join(","),
          },
        })
        .catch((error) => {
          console.log("I fell over for some reason " + error);
          sessionStorage.setItem("token", null);
        });

      setAnalysedTracks(_analysedTracks.data.audio_features);
    }

    getAudioFeatures();
  }, [playlistTracks]);

  return (
    <div className="selected-playlist">
      <img
        className=""
        src={selectedPlaylist.images[0].url}
        style={{
          height: selectedPlaylist.images[0].height,
          width: selectedPlaylist.images[0].width,
        }}
      ></img>
      <h3>{selectedPlaylist.name}</h3>
      <p className="">
        Description:{" "}
        {selectedPlaylist.description
          ? selectedPlaylist.description
          : "no description"}
      </p>
      <p className="">track #: {selectedPlaylist.tracks.total}</p>
      <div className="row">
        <div className="col-12 row justify-content-center">
          {filters.map((filter) => (
            <TrackFilter filter={filter} selectFilter={selectFilter} />
          ))}
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <table className="table table-hover table-borderless">
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Album</th>
              </tr>
            </thead>
            <tbody>
              {playlistTracks !== null && Object.keys(playlistTracks).length > 0
                ? playlistTracks.map((playlistTrack) => (
                    <tr key={playlistTrack.track.id}>
                      <td>{playlistTrack.track.name}</td>
                      <td>{playlistTrack.track.artists.map((artist) => (artist.name))}</td>
                      <td>{playlistTrack.track.album.name}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        <div className="col-6">
          <AnalysedTrackTable analysedTracks={analysedTracks} trackFilter={trackFilter} />
        </div>
      </div>
      <button onClick={handleClick}>Go back</button>
    </div>
  );
};

export default PlaylistDetail;
