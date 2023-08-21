import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const card = (
  <React.Fragment>
    <CardContent sx={{ p: "16px" }}>
      <Box
        sx={{
          gap: "1rem",
          display: "flex",
          flexFlow: "row nowrap",
          marginBottom: "20px",
        }}
      >
        <Box>
          <AccountCircleIcon sx={{ fontSize: 100 }} color="disabled" />
        </Box>

        <Box>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
            Dr. Dusty Huel
          </Typography>
          <Typography sx={{ fontSize: "13px" }}>
            Sunt iusto et veniam ea itaque aut. Ducimus accusamus velit eligendi
            eos sed. Ratione corrupti a quis incidunt non perspiciatis nihil.
          </Typography>
          <Typography sx={{ fontSize: "13px" }}>
            Critical Care Medicine
          </Typography>
          <Typography sx={{ fontSize: "13px" }}>8 years experience</Typography>
          <Box
            sx={{
              display: "grid",
              gridGap: "0.2rem 1rem",
              mt: "1rem",
              gridTemplateRows: "auto auto auto",
              gridTemplateColumns: "auto 1fr",
            }}
          >
            <Typography sx={{ fontSize: "13px", fontWeight: "600" }}>
              Hospital
            </Typography>
            <Typography sx={{ fontSize: "13px" }}>Not available</Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: "600" }}>
              Languages
            </Typography>
            <Typography sx={{ fontSize: "13px" }}>Hindi, English</Typography>
            <Typography sx={{ fontSize: "13px", fontWeight: "600" }}>
              Next available
            </Typography>
            <Typography sx={{ fontSize: "13px" }}>Not available</Typography>
          </Box>
        </Box>
      </Box>
    </CardContent>
    <Box
      sx={{
        gap: "0.5rem",
        bottom: 0,
        display: "flex",
        p: ".8rem",
        position: "absolute",
        flexFlow: "column nowrap",
        alignItems: "flex-start",
        marginLeft: "90px",
      }}
    >
      <Button
        size="small"
        sx={{ flexGrow: 0, flexShrink: 0, borderRadius: "25px" }}
        color="primary"
        variant="outlined"
      >
        <span> BOOK APPOINTMENT</span>
      </Button>
    </Box>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card
        variant="outlined"
        sx={{
          p: ".8rem .2rem",
          overflow: "hidden",
          position: "relative",
          minHeight: "280px",
        }}
      >
        {card}
      </Card>
    </Box>
  );
}
