import ReactPlayer from "react-player/youtube";
import React, { useState, useEffect } from "react";

import queueItemService from "../services/QueueItemService";

const PartyDJMain = (props) => {
  const [queue, setQueue] = useState([]);
  const [url, setUrl] = useState("");
  const [playing, setPlaying] = useState(false);

  const [currentVideo, setCurrentVideo] = useState({});

  const textChange = (e) => {
    setUrl(e.target.value);
  };

  const onClick = async (e) => {

    try {
      const newQueueItem = {
        url,
        user: "GSUGambitCodes",
      };
      const queueItem = await queueItemService.addQueueItem(newQueueItem);
      console.log(
        `video successfully sent to server: ${JSON.stringify(queueItem.data)}`
      );
      getCurrentVideo();
      getQueue();
      setUrl("");
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentVideo = async () => {
    try {
      console.log("requesting next video");
      const currentQueueItem = await queueItemService.getCurrentVideo();
      console.log(
        !currentQueueItem.data
          ? "server returned no current video"
          : `server return: ${JSON.stringify(currentQueueItem.data)}`
      );
      if (currentQueueItem.data) {
        setCurrentVideo(currentQueueItem.data);
      } else {
        setCurrentVideo(null);
      }
    } catch (error) {
      console.error(error);
      setCurrentVideo(null);
    }
  };

  const getQueue = async () => {
      let queue = [];
      try {
          console.log('retrieving the queue from the server.')
          const serverQueue = await queueItemService.retrieveQueue();
          console.log(`server returned queue: ${ JSON.stringify(serverQueue.data) }`);
          if(serverQueue && serverQueue.data) {
              queue = serverQueue.data;
          }
      }catch(error) {
          console.error(error);
      }

      setQueue(queue);
  }

  const onEnded = async (currentVideo, e) => {
    console.log(currentVideo, " has ended");

    setPlaying(false);

    try {
        const playedItem = await queueItemService.ended(currentVideo.id);
        console.log(`updated to be played: ${ JSON.stringify(playedItem.data) }`);
    }catch(error) {
        console.log(error);
    }

    getQueue();
    getCurrentVideo();
    if (!playing && currentVideo && currentVideo.url) {
        setPlaying(true);
      }
  };

  const onReady = () => {
    setPlaying(true);
  };

  const onPlayClick = () => {
    if (playing) {
      setPlaying(false);
    }

    const currentVideo = getCurrentVideo();
    if (!playing && currentVideo && currentVideo.url) {
      setPlaying(true);
    }
  };

  const onSkipClick = async (currentVideo, e) => {
    console.log(
      `onSkipClick called with video: ${JSON.stringify(currentVideo)}`
    );
    setPlaying(false);

    try {
        const skippedVideo = await queueItemService.ended(currentVideo.id);
        console.log(`skipped video: ${ JSON.stringify(skippedVideo.data) }`);
    }catch(error) {
        console.error(error);
    }

    getQueue();
    getCurrentVideo();

    if (!playing && currentVideo && currentVideo.url) {
        setPlaying(true);
      }
  };

  const onError = (e) => {
    console.log("onError below");
    console.log(e);
  };

  const onPlayerChange = (e) => {
    console.log("onPlayerChange below");
    console.log(e);
  };

  const onClearQueue = () => {
    try {
      queueItemService.clearQueue();
    } catch (error) {
      console.error(error);
    }

    setPlaying(false);
    getQueue();
    getCurrentVideo();
  };

  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!currentVideo) {
      getCurrentVideo();
    }
  }, []);

  useEffect(() => {
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!queue || queue.length == 0) {
      getQueue();
    }
  }, []);

  // const currentVideo = getNextVideo();
  console.log(`the queue is: ${JSON.stringify(queue)}`);

  if (currentVideo && currentVideo.url) {
    console.log(`${JSON.stringify(currentVideo)} is playing: ${playing}`);
  } else {
    console.log("nothing is playing");
  }

  return (
    <div className="party-dj-main">
      <p> Home | Search </p>
      <p>
        Enter youtube video: <input onChange={textChange} value={url} />
      </p>
      <button type="submit" onClick={onClick}>
        Submit
      </button>
      {currentVideo && currentVideo.url && (
        <ReactPlayer
          url={currentVideo.url}
          volume={1}
          onReady={onReady}
          onChange={onPlayerChange}
          playing={playing}
          onEnded={(e) => onEnded(currentVideo, e)}
          onError={onError}
        />
      )}
      {currentVideo && currentVideo.url && (
        <button onClick={onPlayClick}>{playing ? "Pause" : "Play"}</button>
      )}
      {currentVideo && currentVideo.url && (
        <button onClick={(e) => onSkipClick(currentVideo, e)}>Skip</button>
      )}
      {<button onClick={onClearQueue}>Clear Queue</button>}
    </div>
  );
};

export default PartyDJMain;
