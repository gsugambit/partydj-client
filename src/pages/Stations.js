import { Link } from "react-router-dom";

const Stations = (props) => {
  return (
    <div className="stations">
      <ul>
        {props.stations.map((station) => {
          return (
            <Link to={`/stations/${station.id}`}>
              <li key={station.id}>{station.name}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Stations;
