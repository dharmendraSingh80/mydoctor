import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const card = (content) => (
  <React.Fragment>
    <CardContent>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          {content.imageUrl ? (
            <CardMedia
              component="img"
              alt="specialities"
              height="140"
              image={`http://my-doctors.net/${content.imageUrl}`}
            />
          ) : (
            <AccountCircleIcon sx={{ fontSize: 130 }} color="disabled" />
          )}
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: "20px" }}>{content.name}</Typography>
        </Box>
      </Box>
    </CardContent>
  </React.Fragment>
);

export default function OutlinedCard({ content }) {
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/search?sp=${content.name}`);
  };
  return (
    <Box>
      <Card
        variant="outlined"
        sx={{ cursor: "pointer" }}
        onClick={handleSearch}
      >
        {card(content)}
      </Card>
    </Box>
  );
}
