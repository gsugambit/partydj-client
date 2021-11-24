import "./App.css";
import NavBar from "./components/NavBar";
import { useState } from "react";
import PartyDJMain from "./pages/PartyDJMain";
import Stations from "./pages/Stations";
import Station from "./components/Station";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { red, lightBlue } from "@mui/material/colors";
import stationService from "./services/StationService";
import { useAsync } from "react-use";
import Messages from "./pages/Messages";

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          "&:hover": { backgroundColor: red },
          backgroundColor: red,
        },
      },
    },
  },
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: lightBlue[500],
    },
  },
});

function App() {
  const [stations, setStations] = useState([]);

  const refreshStations = async () => {
    const stationsResponse = await stationService.getAllStations();
    setStations(stationsResponse.data);
  };

  useAsync(refreshStations);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <NavBar />
          <div className="partydj-content">
            <Routes>
              <Route path="/" element={<PartyDJMain />} />
              <Route
                path="/dashboard"
                element={
                  <Stations
                    stations={stations}
                    refreshStations={refreshStations}
                  />
                }
              />
              <Route path="/stations/:stationUrl" element={<Station />} />
              <Route path="/messages" element={<Messages />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
