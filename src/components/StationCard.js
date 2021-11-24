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
import DeleteIcon from "@mui/icons-material/Delete";
import "./Card.css";

import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({}));

const StationCard = (props) => {
  const classes = useStyles();
  return (
    <Card variant="outlined">
      <CardHeader title={props.title} onClick={props.onTransition} />
      <CardActions>
        <IconButton onClick={props.onDelete}>
          <DeleteIcon />
        </IconButton>
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

export default StationCard;
