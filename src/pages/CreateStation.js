import { useState } from "react";
import stationService from "../services/StationService";

const CreateStation = (props) => {
  const [stationName, setStationName] = useState("");

  const createStation = (e) => {
    e.preventDefault();

    const newStation = {
      name: stationName,
    };

    return stationService
      .create(newStation)
      .then(() => props.refreshStations())
      .error((error) => console.error(error));
  };

  return (
    <div className="create-station">
      <form onSubmit={createStation}>
        Enter Station Name:
        <input
          value={stationName}
          onChange={(e) => {
            setStationName(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreateStation;
