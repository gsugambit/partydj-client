import "./App.css";
import NavBar from "./components/NavBar";
import { useState } from "react";
import PartyDJMain from "./pages/PartyDJMain";
import Stations from "./pages/Stations";
import Station from "./components/Station";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import stationService from "./services/StationService";
import { useAsync } from "react-use";
import Messages from "./pages/Messages";

function App() {
  const [stations, setStations] = useState([]);

  const refreshStations = async () => {
    const stationsResponse = await stationService.getAllStations();
    setStations(stationsResponse.data);
  };

  useAsync(refreshStations);

  return (
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
  );
}

export default App;
