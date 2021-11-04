import "./App.css";
import NavBar from "./components/NavBar";
import { useState, useEffect } from "react";
import PartyDJMain from "./pages/PartyDJMain";
import Stations from "./pages/Stations";
import Station from "./components/Station";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateStation from "./pages/CreateStation";

import stationService from "./services/StationService";
import { useAsync } from "react-use";

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
              path="/stations"
              element={<Stations stations={stations} />}
            />
            <Route path="/stations/:id" element={<Station />} />
            <Route
              path="/create"
              element={<CreateStation refreshStations={refreshStations} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
