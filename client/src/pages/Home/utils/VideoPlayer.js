import React from "react";
import YouTube from "react-youtube";

class VideoPlayer extends React.Component {
    render() {
        const options = {
            height: "200",
            width: "300",
            playerVars: {
                autoplay: 1,
                controls: 1,
            },
        };
        console.log("run 1")

        return (
            <YouTube
                videoId="Oflbho9ZG2U"
                options={options}
                onReady={this._onReady}
                id="video"
            />
        );
    }

    _onReady(event) {
        event.target.pauseVideo();
    }
}

export default VideoPlayer;
