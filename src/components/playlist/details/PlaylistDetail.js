import React, { useContext, useEffect, useState } from "react";
import spotify from "../../../api/Spotify";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { TokenContext } from "../../../contexts/TokenContext";
import useDidMountEffect from "../../../hooks/useDidMountEffect";
import PlaylistChart from "./PlaylistChart";
import PlaylistTracksTable from "./PlaylistTracksTable";
import TrackFilter from "./TrackFilter";

const filters = [
  "acousticness",
  "danceability",
  "energy",
  "instrumentalness",
  "key",
  "loudness",
  "tempo",
  "valence",
];

const PlaylistDetail = ({ selectedPlaylist, deselectPlaylist }) => {
  const { isLightTheme } = useContext(ThemeContext);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [analysedTracks, setAnalysedTracks] = useState([]);
  const [trackFilter, setTrackFilter] = useState("acousticness");
  const [completeTracks, setCompleteTracks] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const { token } = useContext(TokenContext);

  const handleClick = (event) => {
    event.preventDefault();
    deselectPlaylist();
  };

  const selectFilter = (trackFilter) => {
    setTrackFilter(trackFilter);
  };

  useEffect(() => {
    getPlaylistTracks();
  }, []);

  const getPlaylistTracks = async () => {
    console.log("Fetching tracks from Spotify");

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
  };

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
    };

    getAudioFeatures();
  }, [playlistTracks]);

  useDidMountEffect(() => {
    const buildCompleteTracks = () => {
      let playlistTs = JSON.parse(JSON.stringify(playlistTracks));
      let analysedTs = JSON.parse(JSON.stringify(analysedTracks));

      console.log("Playlist tracks: " + playlistTs);
      console.log("Analysed tracks: " + analysedTs);

      let completeTs = playlistTs.map((pt) => {
        let index = analysedTs.findIndex(
          (element) => element.id === pt.track.id
        );

        let at = analysedTs[index];

        return {
          id: pt.track.id,
          number: index + 1,
          name: pt.track.name,
          album: pt.track.album,
          artists: pt.track.artists,
          duration_s: pt.track.durations_ms / 1000,
          stats: {
            acousticness: at.acousticness * 100,
            danceability: at.danceability * 100,
            energy: at.energy * 100,
            instrumentalness: at.instrumentalness * 100,
            key: at.key,
            loudness: at.loudness,
            mode: at.mode,
            tempo: at.tempo,
            valence: at.valence * 100,
          },
        };
      });

      console.log("Complete tracks: " + completeTs);

      setCompleteTracks(completeTs);
    };

    buildCompleteTracks();
  }, [analysedTracks]);

  useDidMountEffect(() => {
    const isDataComplete = () => {
      if (completeTracks.length) {
        setShowChart(true);
      }
    };

    isDataComplete();
  }, [completeTracks]);

  return (
    <div className="selected-playlist">
      <div className="row pb-1">
        <div className="col-12">
          <button
            type="button"
            className={`btn btn-sm btn-${isLightTheme ? "light" : "dark"}`}
            onClick={handleClick}
          >
            Go back
          </button>
        </div>
      </div>

      <div className="row pb-1">
        <div className="col-12 col-md-3">
          <div className="img-wrapper">
            <img
              className="square-img"
              src={selectedPlaylist.images[0].url}
              alt={`Cover for playlist ${selectedPlaylist.name}`}
            ></img>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <h3>{selectedPlaylist.name}</h3>
          {selectedPlaylist.description && (
            <p>{selectedPlaylist.description}</p>
          )}
          <p>{`Created by ${selectedPlaylist.owner.display_name}`}</p>
          <p>
            {selectedPlaylist.tracks.total > 1
              ? selectedPlaylist.tracks.total + " songs"
              : selectedPlaylist.tracks.total + " song"}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <PlaylistTracksTable
            completeTracks={completeTracks}
            trackFilter={trackFilter}
          />
        </div>
      </div>

      <div className="row justify-content-around">
        {filters.map((filter) => (
          <TrackFilter
            key={filter}
            filter={filter}
            trackFilter={trackFilter}
            selectFilter={selectFilter}
          />
        ))}
      </div>

      <div className="row">
        {showChart && (
          <PlaylistChart
            completeTracks={completeTracks}
            trackFilter={trackFilter}
          />
        )}
      </div>
    </div>
  );
};

export default PlaylistDetail;
