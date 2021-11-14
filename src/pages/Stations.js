import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import stationService from "../services/StationService";

import "./Stations.css";

const Stations = (props) => {
  const navigate = useNavigate();

  const onButtonClick = useCallback(
    (stationId) =>
      stationService
        .deleteStation(stationId)
        .then(() => props.refreshStations())
        .catch((error) => console.error(error)),
    []
  );

  const onBodyClick = useCallback(
    (url) => navigate(`/stations/${url}`),
    [navigate]
  );

  return (
    <div className="stations">
      <div className="grid">
        {props.stations.map((station) => {
          return (
            <div key={station.id} className="station__item">
              <Card
                title={station.name}
                onButtonClick={() => onButtonClick(station.id)}
                onBodyClick={() => onBodyClick(station.url)}
                buttonName={"Delete"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stations;
