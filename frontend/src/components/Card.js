import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card as CardContainer,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Card({ hotel }) {
  const [expanded, setExpanded] = React.useState(false);

  console.log(hotel);
  const hasComment = hotel?.comments.length > 0;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <CardContainer sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={hotel.name}
      />
      <CardMedia component="img" height="194" image={hotel.images[0]} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          category, rating and price
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {hasComment && (
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        )}
      </CardActions>
      {hasComment && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>comment: </Typography>
            <Typography paragraph>rating: </Typography>
          </CardContent>
          <CardContent>
            <Typography paragraph>comment: </Typography>
            <Typography paragraph>rating: </Typography>
          </CardContent>
        </Collapse>
      )}
    </CardContainer>
  );
}
