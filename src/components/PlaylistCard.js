import React from 'react';

const PlaylistCard = ({ playlist, selectPlaylist }) => {
    //const [playlistTracks, setPlaylistTracks] = useState([]);
    //const { token } = useContext(TokenContext);

    const handleClick = async (event) => {
      event.preventDefault();
      selectPlaylist(playlist);
    }

    // useEffect(() => {
    //     getPlaylistTracks();
    // }, []);

    // const getPlaylistTracks = async () => {
    //     spotify
    //       .get(playlist.tracks.href, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       })
    //       .then((response) => {
    //         const playlistTracks = [];
    
    //         response.data.items.forEach((track) => {
    //           playlistTracks.push(track);
    //         });
    
    //         setPlaylistTracks(playlistTracks);
    //       })
    //       .catch((error) => {
    //         console.log("I fell over for some reason " + error);
    //         sessionStorage.setItem("token", null);
    //       });
    //   };

    return (
        <div className="card" style={{ width: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          <img
            className="class-img-top"
            src={playlist.images[0].url}
            style={{ height: playlist.images[0].height, width: playlist.images[0].width }}
          ></img>
          <div className="card-body">
            <h3 className="card-title">{playlist.name}</h3>
            <p className="card-text">Description: { playlist.description ? playlist.description : 'no description' }</p>
            <p className="card-text">track #: { playlist.tracks.total }</p>
            {/* <div className="card-text">
              <ul>
                {playlistTracks !== null && playlistTracks.map((playlistTrack) => <li key={playlistTrack.track.id}>{playlistTrack.track.name}</li>)}
              </ul>
            </div> */}
            <button onClick={handleClick}>Analyse Playlist</button>
          </div>
        </div>
      );
}

export default PlaylistCard;