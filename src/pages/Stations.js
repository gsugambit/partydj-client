import { Link } from "react-router-dom";

const Stations = (props) => {
  return (
    <div className="stations">
      <ul>
        {props.stations.map((station) => {
          return (
            <Link key={`link_${station.id}`} to={`/stations/${station.id}`}>
              <li>{station.name}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Stations;
