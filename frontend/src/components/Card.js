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
  Button,
  TextField,
  Box,
  Rating,
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

import hotelService from "../services/hotel";

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

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Card({ hotel }) {
  const [expanded, setExpanded] = React.useState(false);
  const [isComment, setIsComment] = React.useState({
    state: false,
    comment: "",
    user: "",
    rating: null,
  });

  const hasComment = hotel?.comments.length > 0;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddComment = () => {
    handleExpandClick();
    setIsComment((prev) => ({ ...prev, state: true }));
  };

  const handleFormComments = (e) => {
    setIsComment((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { comment, rating, user } = isComment;
    hotelService.postComment(hotel.id, { comment, rating, user });
    handleExpandClick();
    setIsComment((prev) => ({ ...prev, state: false }));
  };
  return (
    <CardContainer sx={{ width: "300px", minHeight: "450px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {hotel.name[0].toUpperCase()}
          </Avatar>
        }
        title={hotel.name}
      />
      <CardMedia component="img" height="194" image={hotel.images[0]} />
      <CardContent>
        <Typography color="text.secondary">
          category: {hotel.category}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography color="text.secondary">
          price: {formatter.format(hotel.price)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          size="small"
          variant="contained"
          onClick={handleAddComment}
          disabled={isComment.state}
        >
          Agregar Comentario
        </Button>
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {isComment.state && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                id="comment"
                label="comment"
                multiline
                maxRows={3}
                value={isComment.comment}
                onChange={handleFormComments}
              />
              <TextField
                fullWidth
                sx={{ marginTop: "10px" }}
                id="user"
                label="user"
                value={isComment.user}
                onChange={(e) => {
                  setIsComment((prev) => ({
                    ...prev,
                    user: e.target.value,
                  }));
                }}
              />
              <div>
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="rating"
                  value={isComment.rating}
                  onChange={(event, newValue) => {
                    setIsComment((prev) => ({ ...prev, rating: newValue }));
                  }}
                />
              </div>
              <Button variant="contained" type="submit">
                enviar
              </Button>
              <Button
                variant="contained"
                type="button"
                onClick={() => {
                  handleExpandClick();
                  setIsComment((prev) => ({ ...prev, state: false }));
                }}
              >
                cancelar
              </Button>
            </form>
          </Box>
        )}
        {hotel.comments.map((comment) => (
          <CardContent key={comment.comment} sx={{ backgroundColor: "grey" }}>
            <Box sx={{ backgroundColor: "grey" }}>
              <Typography paragraph>comment: {comment.comment} </Typography>
              <div>
                <Typography component="legend">Rating</Typography>
                <Rating name="rating" value={comment.rating} readOnly />
              </div>
            </Box>
          </CardContent>
        ))}
      </Collapse>
    </CardContainer>
  );
}
