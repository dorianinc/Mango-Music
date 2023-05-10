import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsThunk } from "../../store/song";
import "./AudioPlayerIndex.css";

/*FOR TESTING */
import song1 from "../../Music/Kanye West - Graduation (2007)/01 Good Morning.mp3";
import song2 from "../../Music/Kanye West - Graduation (2007)/02 Champion.mp3";
import song3 from "../../Music/Kanye West - Graduation (2007)/03 Stronger.mp3";
const song = [song1, song2, song3];
/* */
const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [IsLooping, setIsLooping] = useState(false);
  const [unmuteVolume, setUnmuteVolume] = useState(false);
  const [volume, setVolume] = useState(50);
  const [queueIndex, setQueueIndex] = useState(0);
  const dispatch = useDispatch();
  const getSongs = useSelector((state) => state.songs);
  const songs = Object.values(getSongs);
  console.log("songs 👉", songs);
  // console.log(songs[0]);
  // const song = songs.map((x) => x["mp3"]);

  const audioPlayer = useRef();

  useEffect(() => {
    dispatch(loadSongsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (audioPlayer && audioPlayer.current) {
      if (isPlaying) {
        audioPlayer.current.play();
      } else {
        audioPlayer.current.pause();
      }
    }
  }, [isPlaying, audioPlayer, queueIndex]);

  useEffect(() => {
    if (audioPlayer && audioPlayer.current) {
      audioPlayer.current.volume = volume / 100;
      audioPlayer.current.muted = unmuteVolume;
    }
  }, [volume, audioPlayer, unmuteVolume]);

  if (!getSongs) return null;

  const goForward = () => {
    if (queueIndex < songs.length - 1) {
      setQueueIndex((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (queueIndex > 0) {
      setQueueIndex((prev) => prev - 1);
    }
  };

  const playPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const loopControl = () => {
    setIsLooping((prev) => !prev);
  };

  if (!songs.length) return null
  console.log("=====>", songs[queueIndex])
  return (
    <div className="audio-player">
      <div className="audio-player-track-controls">
        <button onClick={(e) => alert("Feature Coming Soon!")}>Shuffle</button>
        <button onClick={goBack}>Back</button>
        <button onClick={playPause}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={goForward}>Forward</button>
        <button onClick={loopControl}>Loop</button>
      </div>
      <div className="audio-player-track-center">
        <div className="audio-player-track-info">
          <img className="musicCover audio-player-img" src={songs[queueIndex].album.cover} />
          <div className="audio-player-text">
            <h3 className="title">{songs[queueIndex].title}</h3>
            <p className="subTitle">{songs[queueIndex].artist.name}</p>
          </div>
        </div>
        <span>Progress Bar</span>
      </div>
      <div className="audio-player-volume-controls">
        <button onClick={() => setUnmuteVolume((prev) => !prev)}>{unmuteVolume?"Unmute":"Mute"}</button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
      <audio src={song[queueIndex]} ref={audioPlayer} loop={IsLooping} style={{ display: "hidden" }}></audio>
    </div>
  );
};
export default AudioPlayer;
