import ReactPlayer from "react-player/youtube";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import queueItemService from "../services/QueueItemService";

import stationService from "../services/StationService";

import "./Station.css";

const Station = () => {
  const [currentVideo, setCurrentVideo] = useState({});
  const [playing, setPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [station, setStation] = useState(null);
  const [url, setUrl] = useState("");
  const [volume, setVolume] = useState(0);

  const { id } = useParams();

  const setStationOnLoad = () => {
    return stationService
      .retrieveStation(id)
      .then((response) => setStation(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setStationOnLoad();
  }, []);

  useEffect(() => {
    getCurrentVideo();
  }, [station]);

  useEffect(() => {
    getQueue();
  }, [station]);

  const addToQueue = async () => {
    const newQueueItem = {
      url,
      user: "GSUGambitCodes",
      stationId: station.id,
    };

    return queueItemService
      .addQueueItem(station.id, newQueueItem)
      .then((response) => {
        setStation(response.data);
        setUrl("");
      })
      .catch((error) => console.error(error));
  };

  const getCurrentVideo = async () => {
    if (!station) {
      return;
    }

    return queueItemService
      .getCurrentVideo(station.id)
      .then((response) => setCurrentVideo(response.data ? response.data : null))
      .catch((error) => console.error(error));
  };

  const getQueue = async () => {
    if (!station) {
      return;
    }

    return queueItemService
      .retrieveQueue(station.id)
      .then((response) => setQueue(response.data))
      .catch((error) => console.error(error));
  };

  const endCurrentVideo = async (currentVideo) => {
    setPlaying(false);

    return queueItemService
      .ended(station.id, currentVideo.id)
      .then(() => {
        getQueue();
        getCurrentVideo();

        if (!playing && currentVideo && currentVideo.url) {
          setPlaying(true);
        }
      })
      .catch((error) => console.error(error));
  };

  const onClearQueue = () => {
    setPlaying(false);
    return queueItemService
      .clearQueue(station.id)
      .then((response) => setStation(response.data))
      .catch((error) => console.error(error));
  };

  const volumeControl = () => {
    setVolume((prevVolume) => {
      if (prevVolume === 0) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  const loadingContent = <p>loading please wait</p>;
  if (!station) {
    return <div className="station">{loadingContent}</div>;
  }

  return (
    <div className="station">
      {!station && loadingContent}
      <h1>{station.name}</h1>
      <p>
        Enter youtube video:{" "}
        <input onChange={(e) => setUrl(e.target.value)} value={url} />
      </p>
      <button type="submit" onClick={addToQueue}>
        Submit
      </button>
      {currentVideo && currentVideo.url && (
        <div className="youtube">
          <ReactPlayer
            url={currentVideo.url}
            volume={volume}
            onReady={() => setPlaying(true)}
            onChange={(e) => console.error("onChange: ", e)}
            playing={playing}
            onEnded={(e) => endCurrentVideo(currentVideo, e)}
            onError={(e) => console.error("onError: ", e)}
            pip={false}
            controls={false}
          />
        </div>
      )}
      {currentVideo && currentVideo.url && (
        <button onClick={() => setPlaying(playing ? false : true)}>
          {playing ? "Pause" : "Play"}
        </button>
      )}
      {currentVideo && currentVideo.url && (
        <button onClick={(e) => endCurrentVideo(currentVideo, e)}>Skip</button>
      )}
      <button onClick={onClearQueue}>Clear Queue</button>
      <button onClick={volumeControl}>
        {volume === 0 ? "Unmute" : "Mute"}
      </button>

      <ul>
        {queue
          .slice(1)
          .filter((item) => !item.played)
          .map((queueItem) => (
            <li key={queueItem.id}>
              {queueItem.index}: {queueItem.url}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Station;
