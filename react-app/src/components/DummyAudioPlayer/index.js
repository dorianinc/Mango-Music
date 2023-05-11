import "./DummyAudioPlayerIndex.css"

const DummyAudioPlayer = () => {

  return (
    <div className="audio-player">
      <div className="audio-player-track-controls">
        <p className="audio-player-shuffle"><i className="fa-solid fa-shuffle " style={{color:"rgba(238, 238, 238, 0.2)"}}></i></p>
        <p className="audio-playeer-back"><i className="fa-solid fa-backward" style={{color:"rgba(238, 238, 238, 0.2)"}}></i></p>
        <p className="audio-player-play-pause"><i className="fa fa-play" aria-hidden="true" style={{color:"rgba(238, 238, 238, 0.2)"}}></i></p>
        <p className="audio-player-forward"><i className="fa-solid fa-forward" style={{color:"rgba(238, 238, 238, 0.2)"}}></i></p>
        <p className="audio-player-loop"><i className="fa-solid fa-repeat" style={{color:"rgba(238, 238, 238, 0.2)"}}></i></p>
      </div>
      <div className="audio-player-track-center">
        <div className="audio-player-track-info">
          <img className="musicCover audio-player-img" src={"https://cdn.imgbin.com/25/10/25/imgbin-computer-icons-mango-mango-6U7r1pgqB9e6UqCM7mtQXhsnW.jpg"} alt={"mango icon"} />
          <div className="audio-player-text">
            <h3 className="title">{"Mango Music"}</h3>
            <p className="subTitle">{"By Dorian, Kevin, Alan N., Alan E."}</p>
          </div>
        </div>

      </div>
      <div className="audio-player-volume-controls">
        <p className="audio-player-mute-button"><i className="fa-solid fa-volume-high" style={{color:"rgba(238, 238, 238, 0.2)"}}></i></p>
        <input
          type="range"
          min={0}
          max={100}
          value={50}
        />
      </div>
    </div>
  );
};
export default DummyAudioPlayer;