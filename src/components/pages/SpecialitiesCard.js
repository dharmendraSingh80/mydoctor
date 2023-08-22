import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

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
          <CardMedia
            component="img"
            alt="specialities"
            height="140"
            image={`http://my-doctors.net/${content.imageUrl}`}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: "20px" }}>{content.name}</Typography>
        </Box>
      </Box>
    </CardContent>
  </React.Fragment>
);

export default function OutlinedCard({ content }) {
  return (
    <Box>
      <Card variant="outlined">{card(content)}</Card>
    </Box>
  );
}
