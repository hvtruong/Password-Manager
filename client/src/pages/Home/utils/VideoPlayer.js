import React from "react";
import YouTube from "react-youtube";

class VideoPlayer extends React.Component {
    render() {
        const options = {
            height: "200",
            width: "350",
            playerVars: {
                autoplay: 1,
                controls: 1,
            },
        };

        return (
            <YouTube
                videoId="7-0wf8NVmfE"
                options={options}
                onReady={this._onReady}
                id="video"
                style={{marginRight: "1em"}}
            />
        );
    }

    _onReady(event) {
        event.target.pauseVideo();
    }
}

export default VideoPlayer;
