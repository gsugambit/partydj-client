import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import stationService from "../services/StationService";

import { Grid, TextField, Button, ButtonGroup, FormLabel } from "@mui/material";

import "./Stations.css";

const Stations = (props) => {
  const [formOpen, setFormOpen] = useState(false);
  const [stationName, setStationName] = useState("");

  const navigate = useNavigate();

  const onButtonClick = useCallback(
    (stationId) =>
      stationService
        .deleteStation(stationId)
        .then(() => props.refreshStations())
        .catch((error) => console.error(error)),
    []
  );

  const validForm = () => {
    return stationName ? false : true;
  };

  const onBodyClick = useCallback(
    (url) => navigate(`/stations/${url}`),
    [navigate]
  );

  const createStation = (e) => {
    e.preventDefault();

    const newStation = {
      name: stationName,
    };

    return stationService
      .create(newStation)
      .then(() => props.refreshStations())
      .then(() => setStationName(""))
      .then(() => setFormOpen(false))
      .catch((error) => console.error(error));
  };

  const cancelForm = (e) => {
    e.preventDefault();

    setStationName("");
    setFormOpen(false);
  };

  return (
    <div className="stations">
      {formOpen && (
        <form onSubmit={createStation}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid item>
              <TextField
                id="station-name-input"
                name="stationName"
                label="Station Name"
                type="text"
                value={stationName}
                required
                onChange={(e) => setStationName(e.target.value)}
              />
            </Grid>
            <ButtonGroup>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={validForm()}
                name="submit-button"
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="button"
                name="cancel-button"
                onClick={cancelForm}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </Grid>
        </form>
      )}
      {!formOpen && (
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
          <div key={"create-a-station"} className="station__item">
            <Card
              title={"Add A Station"}
              onButtonClick={() => setFormOpen(true)}
              onBodyClick={() => {}}
              buttonName={"Add"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Stations;
