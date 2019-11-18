import React, { Component } from "react";
import "./styles.css";
import { getTrailers } from "../api/trailers";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trailers: [],
      mainTrailerShow: false,
      mainTrailerTopOffset: 0,
      currentTrailerIndex: 0,
      aboveTrailerBoxIndex: 0
    };
    this.fetchTrailers = this.fetchTrailers.bind(this);
    this.getDomPosition = this.getDomPosition.bind(this);
    this.clearPreviousTrailerMargin = this.clearPreviousTrailerMargin.bind(
      this
    );
  }

  clearPreviousTrailerMargin() {
    const previousTrailerBox = document.getElementsByClassName("trailer-box")[
      this.state.aboveTrailerBoxIndex
    ];
    previousTrailerBox.style.marginBottom = 0;
  }

  getDomPosition(e, index) {
    this.clearPreviousTrailerMargin();
    const appWidth = document
      .getElementsByClassName("App")[0]
      .getBoundingClientRect().width;
    const indexOffset = Math.floor(appWidth / 232);
    const aboveTrailerBoxIndex = index - indexOffset;
    const aboveTrailerBox = document.getElementsByClassName("trailer-box")[
      aboveTrailerBoxIndex
    ];
    this.setState({
      mainTrailerShow: true,
      mainTrailerTopOffset: e.target.offsetTop,
      currentTrailerIndex: index,
      aboveTrailerBoxIndex
    });
    aboveTrailerBox.style.marginBottom = "500px";
  }

  async fetchTrailers() {
    const res = await getTrailers();
    const trailers = Object.keys(res.data[1]).map(eachTrailer => {
      return {
        name: res.data[1][eachTrailer].EventName,
        posterCode: res.data[1][eachTrailer].EventCode,
        trailerLink: res.data[1][eachTrailer].TrailerURL
      };
    });
    this.setState({ trailers });
  }

  componentDidMount() {
    this.fetchTrailers();
  }

  render() {
    const currentTrailerEmbedLink = this.state.trailers.length
      ? this.state.trailers[this.state.currentTrailerIndex].trailerLink.replace(
          "watch?v=",
          "embed/"
        )
      : null;
    return (
      <div className="App">
        {this.state.mainTrailerShow ? (
          <div
            style={{ top: `${this.state.mainTrailerTopOffset}px` }}
            className="trailer-video"
          >
            <iframe
              height="100%"
              width="100%"
              src={currentTrailerEmbedLink}
              title={"trailer-video"}
              frameborder="0"
              allowfullscreen
            />
          </div>
        ) : null}
        <div className="trailer-container">
          {this.state.trailers.map((eachTrailer, index) => {
            return (
              <div
                className="trailer-box"
                key={`trailer-box-${index}`}
                onClick={e => {
                  this.getDomPosition(e, index);
                }}
              >
                <img
                  alt={"movie-poster"}
                  src={`https://in.bmscdn.com/events/moviecard/${
                    eachTrailer.posterCode
                  }.jpg`}
                  className="movie-poster"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
