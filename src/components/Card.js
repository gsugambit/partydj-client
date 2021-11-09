import "./Card.css";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card__body" onClick={props.onBodyClick}>
        <h2 className="card__body__title">{props.title}</h2>
      </div>
      <button className="card__button" onClick={props.onButtonClick}>
        {props.buttonName}
      </button>
    </div>
  );
};

export default Card;
