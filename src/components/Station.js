import ReactPlayer from "react-player/youtube";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import queueItemService from "../services/QueueItemService";
import { useAsync } from "react-use";
import stationService from "../services/StationService";

const Station = (props) => {
  const [queue, setQueue] = useState([]);
  const [url, setUrl] = useState("");
  const [playing, setPlaying] = useState(false);
  const [station, setStation] = useState(null);

  const { id } = useParams();

  const retrieveStation = async () => {
    try {
      console.log("retrieving station with id", id);
      const serverStation = await stationService.retrieveStation(id);
      console.log(
        `retrieved station with id ${JSON.stringify(serverStation.data)}`
      );
      setStation(serverStation.data);
      setQueue(serverStation.data.queue);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentVideo();
  }, [station]);

  useAsync(retrieveStation);

  const [currentVideo, setCurrentVideo] = useState({});

  const textChange = (e) => {
    setUrl(e.target.value);
  };

  const onClick = async (e) => {
    try {
      const newQueueItem = {
        url,
        user: "GSUGambitCodes",
        stationId: station.id,
      };
      const queueItem = await queueItemService.addQueueItem(
        station.id,
        newQueueItem
      );
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
    if (!station) {
      console.log("we have no station");
      return;
    }

    try {
      console.log("requesting next video");
      const currentQueueItem = await queueItemService.getCurrentVideo(
        station.id
      );
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
    if (!station) {
      return;
    }
    let queue = [];
    try {
      console.log("retrieving the queue from the server.");
      const serverQueue = await queueItemService.retrieveQueue(station.id);
      console.log(`server returned queue: ${JSON.stringify(serverQueue.data)}`);
      if (serverQueue && serverQueue.data) {
        queue = serverQueue.data;
      }
    } catch (error) {
      console.error(error);
    }

    setQueue(queue);
  };

  const onEnded = async (currentVideo, e) => {
    console.log(currentVideo, " has ended");

    setPlaying(false);

    try {
      const playedItem = await queueItemService.ended(
        station.id,
        currentVideo.id
      );
      console.log(`updated to be played: ${JSON.stringify(playedItem.data)}`);
    } catch (error) {
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
      const skippedVideo = await queueItemService.ended(
        station.id,
        currentVideo.id
      );
      console.log(`skipped video: ${JSON.stringify(skippedVideo.data)}`);
    } catch (error) {
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
      queueItemService.clearQueue(station.id);
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
    if (!currentVideo || Object.keys(currentVideo).length === 0) {
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

  const loadingContent = <p>loading please wait</p>;

  if (!station) {
    return <div className="station">{loadingContent}</div>;
  }

  return (
    <div className="station">
      {!station && loadingContent}
      <h1>{station.name}</h1>
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

export default Station;
