import { useDispatch, useSelector } from "react-redux";
import { deleteAlbumThunk } from "../../store/album";
import { useEffect, useState, useRef } from "react";
import AlbumsIndexItem from "../AlbumsIndexItem";
import PlayButton from "../PlayButton";
import { useHistory, useParams } from "react-router-dom";
import { loadOneAlbumThunk } from "../../store/album";
import { singleSongThunk } from "../../store/song";
import { deleteLikeThunk, createLikeThunk } from "../../store/like";
import LikeButton from "../LikeButton";
import SongForm from "../SongForm";
import { deleteSongThunk } from "../../store/song";
import OpenModalDeleteButton from "../DeleteSong/OpenModalDeleteButton";
import DeleteSongModal from "../DeleteSong";
import { usePlayer } from "../../context/PlayerContext";
import "./AlbumById.css";
import AuthModal from "../AuthModal"

const AlbumById = () => {
  const [hoveredSong, setHoveredSong] = useState("");
  const dispatch = useDispatch();
  const { isPlaying, setIsPlaying } = usePlayer();
  const audioPlayer = useRef();
  const song = useSelector((state) => Object.values(state.songs));
  const history = useHistory();
  const album = useSelector((state) => state.albums);
  const likes = useSelector((state) => Object.values(state.likes));
  const albumSongs = album["Songs"];
  const user = useSelector((state) => state.session.user);
  const { albumId } = useParams();
  console.log(Object.values(album), "album state checking");

  useEffect(() => {
    console.log("inside album by id", albumId);
    dispatch(loadOneAlbumThunk(albumId));
  }, [dispatch]);

  if (!album["Songs"]) return null;

  if (!user) {
    return <AuthModal />;
  }

  const handleShuffle = (e) => {
    e.preventDefault();
    alert("Feature Coming Soon");
  };

  const handleLikeButton = async (e, songId) => {
    e.preventDefault();
    if (likes.filter((like) => like["song_id"] == songId).length > 0) {
      let like = likes.filter((like) => {
        return like["song_id"] == songId;
      });
      like = like[0];
      await dispatch(deleteLikeThunk(like.id));
    } else {
      await dispatch(createLikeThunk({ song_id: songId }));
    }
  };

  // user only function
  const handleUpdate = () => {
    history.push(`/albums/${albumId}/edit`);
  };
  const handleDelete = () => {
    dispatch(deleteAlbumThunk(albumId));
    history.push(`/albums`);
  };

  return (
    <div className="outerAlbumContainer">
      <div className="innerAlbumContainer top">
        <div className="coverDiv">
          <img
            className="albumImage"
            src={album["Album"].cover}
            alt={album["Album"].title}
            style={{ borderRadius: "10px" }}
          />
        </div>
        <div className="albumMenu">
          <h1 className="albumTitle">{album["Album"].title}</h1>
          <h2 className="albumArtist">{album["Album"].artist}</h2>
          <div className="albumGenreYear">
            <p className="albumGenre">{album["Album"].genre}</p>
            <p id="dot">·</p>
            <p></p>
            <p className="albumYear">{album["Album"].year}</p>
          </div>
          <div
            className="descContainer"
            data-tooltip={album["Album"].description.length > 217 ? "MORE" : ""}
          >
            <p className="albumDesc">{album["Album"].description}</p>
          </div>
          <div class="orangeButtons">
            {
            albumSongs && albumSongs.length > 0 &&
            <PlayButton songId={albumSongs[0].id} songs={albumSongs} isButton={true} />
            }
            <button className="orangeButton" onClick={handleShuffle}>
              <i class="fa-sharp fa-solid fa-shuffle" />
              Shuffle
            </button>
          </div>
        </div>
      </div>
      {user.artist_id === album.Album.artist_id && (
        <div>
          <SongForm albumId={albumId} />
        </div>
      )}
      <div className="song-list" onMouseLeave={() => setHoveredSong("")}>
        <table className="songTable">
          <th id="songColumn">Song</th>
          <th id="likesColumn"></th>
          {album["Songs"].map((song, i) => (
            <tr
              className={`songData ${i % 2 === 0 ? "grey" : ""}`}
              onMouseEnter={() => setHoveredSong(i)}
            >
              <td className="songTitle">
                {/* <p>
                {playlist.songs.id === selectedSong ? (
                  <i class="fa-sharp fa-solid fa-pause orange" />
                ) : i === hoveredSong ? (
                  <i class="fa-solid fa-play orange" />
                ) : (
                  i + 1
                )}
              </p> */}
                <PlayButton songId={song.id} songs={albumSongs} isButton={false} />
                <p>{song.title}</p>
              </td>
              <td onClick={(e) => handleLikeButton(e, song.id)}>
                {likes.filter((like) => like["song_id"] == song.id).length > 0 ? (
                  <i class="fa-solid fa-thumbs-up" />
                ) : i === hoveredSong ? (
                  <i class="fa-regular fa-thumbs-up" />
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </table>
      </div>
      {user.artist_id === album["Album"].artist_id && (
        <>
          <button className="update-button" onClick={handleUpdate}>
            UPDATE ME
          </button>
          <button className="delete-button" onClick={handleDelete}>
            DELETE ME
          </button>
        </>
      )}
    </div>
  );
};

export default AlbumById;
