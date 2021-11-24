import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";

const YoutubeCard = (props) => {
  return (
    <Card variant="outlined" onClick={props.onClick}>
      <CardHeader title={props.title} onClick={props.onTransition} />
      <CardContent>
        <CardMedia
          component="img"
          image={props.imageUrl}
          width={props.imageHeight}
          height={props.imageWidth}
        />
      </CardContent>
    </Card>
    // <div className="card">
    //   <div className="card__body" onClick={props.onBodyClick}>
    //     <h2 className="card__body__title">{props.title}</h2>
    //     {props.imageUrl && (
    //       <img
    //         className="card__body__image"
    //         src={props.imageUrl}
    //         style={{ width: props.imageWidth, height: props.imageHeight }}
    //       />
    //     )}
    //   </div>
    //   {props.buttonName && (
    //     <button className="card__button" onClick={props.onButtonClick}>
    //       {props.buttonName}
    //     </button>
    //   )}
    // </div>
  );
};

export default YoutubeCard;
