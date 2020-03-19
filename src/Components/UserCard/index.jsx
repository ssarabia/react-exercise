import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 340
  }
});

const UserCard = ({ userInfo }) => {
  const classes = useStyles();
  const {
    avatar_url: avatarUrl,
    login: username,
    public_repos: repoCount,
    name,
    id,
    birthdate,
    email
  } = userInfo;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={avatarUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {`@${username}`}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {`ID: ${id}`}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {`Birth Date: ${birthdate}`}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {`Email: ${email}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography variant="body2" color="textSecondary" component="p">
          {`${repoCount} Repositories`}
        </Typography>
      </CardActions>
    </Card>
  );
};

UserCard.propTypes = {
  userInfo: PropTypes.object,
  repoCount: PropTypes.number
};

export default UserCard;
