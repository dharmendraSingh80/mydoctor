import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

export default function DetailsCard({ content }) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <img alt={`${content?.firstName} ${content?.lastName}`} />
          </Avatar>
        }
        title={`Dr.${content?.firstName} ${content?.lastName}`}
        subheader={
          content?.experienceMonths
            ? Math.floor(content?.experienceMonths / 12) +
              " years of experience "
            : "No experience"
        }
        sx={{
          "& .MuiTypography-body2": {
            fontSize: "1rem",
          },
        }}
      />

      <CardContent>
        <Typography
          sx={{ fontSize: "1rem" }}
          variant="body2"
          color="text.secondary"
        >
          {content?.profile?.bio ? content.profile.bio : "Bio not available"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
