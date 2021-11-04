import { useState } from "react";
import stationService from "../services/StationService";

const CreateStation = (props) => {
  const [stationName, setStationName] = useState("");

  const createStation = async (e) => {
    e.preventDefault();
    console.log(e);

    const newStation = {
      name: stationName,
    };

    try {
      console.log(`trying to create station: ${JSON.stringify(newStation)}`);
      const station = await stationService.create(newStation);
      console.log(`created station ${JSON.stringify(station)}`);
      props.refreshStations();
    } catch (error) {
      console.error(error);
      alert(JSON.stringify(error.response.data));
    }
  };

  return (
    <div className="create-station">
      <form onSubmit={createStation}>
        Enter Station Name:
        <input
          value={stationName}
          onChange={(e) => {
            console.log(e);
            setStationName(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreateStation;
