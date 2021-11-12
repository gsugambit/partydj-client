import "./Card.css";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card__body" onClick={props.onBodyClick}>
        <h2 className="card__body__title">{props.title}</h2>
        {props.imageUrl && (
          <img className="card__body__image" src={props.imageUrl} />
        )}
      </div>
      {props.buttonName && (
        <button className="card__button" onClick={props.onButtonClick}>
          {props.buttonName}
        </button>
      )}
    </div>
  );
};

export default Card;
