import StationCard from "../components/StationCard";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import stationService from "../services/StationService";

import {
  Box,
  Grid,
  TextField,
  Button,
  ButtonGroup,
  FormLabel,
} from "@mui/material";

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
        <Box>
          <Grid>
            <Button onClick={() => setFormOpen(true)}>Add Station</Button>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={{ xs: 2, md: 3 }}
            padding={{ xs: 2, md: 3 }}
            border={"10px"}
          >
            {props.stations.map((station) => (
              <Grid item key={station.id} xs={2} sm={4} md={4}>
                <StationCard
                  title={station.name}
                  onTransition={() => onBodyClick(station.url)}
                  onDelete={() => onButtonClick(station.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        //  <div className="grid">
        //   {props.stations.map((station) => {
        //     return (
        //       <div key={station.id} className="station__item">
        //         <StationCard
        //           title={station.name}
        //           onTransition={() => onBodyClick(station.url)}
        //           onDelete={() => onButtonClick(station.id)}
        //         />
        //       </div>
        //     );
        //   })}
        //   { <div key={"create-a-station"} className="station__item">
        //     <Station
        //       title={"Add A Station"}
        //       onButtonClick={() => setFormOpen(true)}
        //       onBodyClick={() => {}}
        //       buttonName={"Add"}
        //     />
        //   </div> }
        //  </div>
      )}
    </div>
  );
};

export default Stations;
