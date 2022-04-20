import ReactPlayer from "react-player/youtube";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Card from "../components/Card";
import queueItemService from "../services/QueueItemService";
import stationService from "../services/StationService";
import youtubeSearchService from "../services/YoutubeSearchService";
import "./Station.css";

const Station = () => {
  const [currentVideo, setCurrentVideo] = useState({});
  const [playing, setPlaying] = useState(false);
  const [queue, setQueue] = useState([]);

  const [searchResponse, setSearchResponse] = useState([]);
  const [station, setStation] = useState(null);
  const [url, setUrl] = useState("");
  const [volume, setVolume] = useState(0);

  const { stationUrl } = useParams();

  const setStationOnLoad = () => {
    return stationService
      .retrieveStation(stationUrl)
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

  const search = async () => {
    return youtubeSearchService
      .search(url)
      .then((response) => setSearchResponse(response.data))
      .then(() => setUrl(""))
      .catch((error) => console.error(error));
  };

  const addToQueue = async (queueItem) => {
    const newQueueItem = {
      url: `https://youtube.com/watch?v=${queueItem.videoId}`,
      user: "GSUGambitCodes",
      stationId: station.id,
      ...queueItem,
    };

    return queueItemService
      .addQueueItem(station.id, newQueueItem)
      .then((response) => {
        setStation(response.data);
      })
      .then(() => setSearchResponse([]))
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

  let searching = false;
  if (searchResponse.length > 0) {
    searching = true;
  }

  return (
    <div className="station">
      {!station && loadingContent}
      <h1>{station.name}</h1>
      <p>
        Search YouTube:
        <input onChange={(e) => setUrl(e.target.value)} value={url} />
      </p>
      <button type="submit" onClick={search}>
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
              {queueItem.index}: {queueItem.title}
            </li>
          ))}
      </ul>

      {searching && (
        <div className="grid">
          {searchResponse.map((response) => (
            <div key={response.videoId} className="grid__item">
              <Card
                title={response.title}
                imageUrl={response.thumbnail.url}
                imageHeight={response.thumbnail.height}
                imageWidth={response.thumbnail.width}
                onBodyClick={() => {
                  addToQueue({
                    videoId: response.videoId,
                    title: response.title,
                  });
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Station;
