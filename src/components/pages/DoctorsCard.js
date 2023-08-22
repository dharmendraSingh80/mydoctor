import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const card = (content) => (
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
            Dr.{content.firstName + " " + content.lastName}
          </Typography>
          <Typography sx={{ fontSize: "13px" }}>
            {content.profile?.qualifications &&
            content.profile.qualifications.length > 0
              ? content.profile.qualifications
                  .map((qualification) => qualification.name)
                  .join(" | ")
              : ""}
          </Typography>
          <Typography sx={{ fontSize: "13px" }}>
            {content.profile?.specialities &&
            content.profile.specialities.length > 0
              ? content.profile.specialities
                  .map((speciality) => speciality.name)
                  .join(" | ")
              : ""}
          </Typography>

          <Typography sx={{ fontSize: "13px" }}>
            {content.profile?.experienceMonths
              ? Math.floor(content.profile.experienceMonths / 12) +
                " years of experience "
              : ""}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridGap: "0.2rem 1rem",
              mt: "1rem",
              gridTemplateRows: "auto auto auto",
              gridTemplateColumns: "auto 1fr",
            }}
          >
            <Typography variant="h6" sx={{ fontSize: "13px" }}>
              Hospital
            </Typography>
            <Typography sx={{ fontSize: "13px" }}>
              {content.profile?.experience &&
              content.profile.experience.length > 0
                ? content.profile.experience.some(
                    (experience) => !experience.toYear
                  )
                  ? content.profile.experience.map((experience, index) =>
                      !experience.toYear ? (
                        <span key={index}>{experience.place}</span>
                      ) : null
                    )
                  : "Not available"
                : "Not available"}
            </Typography>

            <Typography variant="h6" sx={{ fontSize: "13px" }}>
              Languages
            </Typography>
            <Typography sx={{ fontSize: "13px" }}>
              {content?.profile?.languages
                ? content.profile.languages.map((language, index) => (
                    <span key={index}>
                      {language}
                      {index !== content.profile.languages.length - 1
                        ? ", "
                        : ""}
                    </span>
                  ))
                : "Not available"}
            </Typography>

            <Typography variant="h6" sx={{ fontSize: "13px" }}>
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
        marginLeft: "7rem",
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

export default function OutlinedCard({ content }) {
  console.log(content);
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
        {card(content)}
      </Card>
    </Box>
  );
}
