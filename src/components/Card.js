import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Card.css";
import { PrintOutlined } from "@mui/icons-material";

const PartyDJCard = (props) => {
  return (
    <Card>
      <CardHeader title={props.title} />
      {props.imageUrl && (
        <CardMedia
          component="img"
          height="90"
          width="120"
          image={props.imageUrl}
          alt="youtube link"
        />
      )}
      {/* <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
      </CardContent> */}
      <CardActions>
        {props.onButtonClick && <DeleteIcon onClick={props.onButtonClick} />}
        {props.onBodyClick && (
          <Button onClick={props.onBodyClick}>{props.buttonName}</Button>
        )}
      </CardActions>
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

export default PartyDJCard;
