import * as React from "react";
import Rating from "@mui/material/Rating";
import { Box, Typography, Button } from "@mui/material/";
import StarIcon from "@mui/icons-material/Star";
import styles from "../../styles/rating.module.css";

const labels = {
  1: "Very sad",
  2: "Sad",
  3: "Neutral",
  4: "Happy",
  5: "Very happy",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box>
      <Typography component="label">Rating</Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating
          name="hover-feedback"
          value={value}
          //   precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          icon={<StarIcon color="primary" fontSize="inherit" />}
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Box>
      <Box>
        <form name="reviewForm">
          <input type="text" name="review" className={styles.input} />
          <br />
          <Button
            variant="outlined"
            size="small"
            sx={{
              borderWidth: "1px",
              borderRadius: "15px",
              width: "140px",
              color: "#3F51B5",
              borderColor: "#3F51B5",
              transition: "background-color 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "#3F51B5",
                color: "#fff",
              },
            }}
          >
            submit
          </Button>
        </form>
      </Box>
    </Box>
  );
}
