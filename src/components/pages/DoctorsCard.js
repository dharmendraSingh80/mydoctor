import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const card = (content) => {
  const qualifications =
    content.profile?.qualifications && content.profile.qualifications.length > 0
      ? content.profile.qualifications
          .map((qualification) => qualification.name)
          .join(" | ")
      : "";
  const specialities =
    content.profile?.specialities && content.profile.specialities.length > 0
      ? content.profile.specialities
          .map((speciality) => speciality.name)
          .join(" | ")
      : "";
  const experience = content.profile?.experienceMonths
    ? Math.floor(content.profile.experienceMonths / 12) +
      " years of experience "
    : "";

  const curentlyWorkingHospital =
    content.profile?.experience && content.profile.experience.length > 0
      ? content.profile.experience.some((experience) => !experience.toYear)
        ? content.profile.experience.map((experience, index) =>
            !experience.toYear ? (
              <span key={index}>{experience.place}</span>
            ) : null
          )
        : "Not available"
      : "Not available";
  const languages = content?.profile?.languages
    ? content.profile.languages.map((language, index) => (
        <span key={index}>
          {language}
          {index !== content.profile.languages.length - 1 ? ", " : ""}
        </span>
      ))
    : "Not available";
  return (
    <React.Fragment>
      <CardContent sx={{ p: "16px" }}>
        <Box sx={styles.docIcon}>
          <Box>
            <AccountCircleIcon sx={{ fontSize: 100 }} color="disabled" />
          </Box>

          <Box>
            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
              Dr. {content.firstName + " " + content.lastName}
            </Typography>
            <Typography color="text.secondary" sx={styles.field}>
              {qualifications}
            </Typography>
            <Typography color="text.secondary" sx={styles.field}>
              {specialities}
            </Typography>

            <Typography color="text.secondary" sx={styles.field}>
              {experience}
            </Typography>
            <Box sx={styles.doctorsSpecifications}>
              <Typography sx={styles.field}>Hospital</Typography>
              <Typography color="text.secondary" sx={styles.field}>
                {curentlyWorkingHospital}
              </Typography>

              <Typography sx={styles.field}>Languages</Typography>
              <Typography color="text.secondary" sx={styles.field}>
                {languages}
              </Typography>

              <Typography sx={styles.field}>Next available</Typography>
              <Typography color="text.secondary" sx={styles.field}>
                Not available
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </React.Fragment>
  );
};

export default function OutlinedCard({ content }) {
  const navigate = useNavigate();
  const handleBookAppointment = () => {
    const id = content._id;
    navigate(`/doctor/${id}`);
  };
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={styles.card}>
        {card(content)}
        <Box sx={styles.buttonStyle}>
          <Button
            size="small"
            sx={{ flexGrow: 0, flexShrink: 0, borderRadius: "25px" }}
            color="primary"
            variant="outlined"
            onClick={handleBookAppointment}
          >
            <span> BOOK APPOINTMENT</span>
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

const styles = {
  card: {
    p: ".8rem .2rem",
    overflow: "hidden",
    position: "relative",
    minHeight: "280px",
  },
  docIcon: {
    gap: "1rem",
    display: "flex",
    flexFlow: "row nowrap",
    marginBottom: "20px",
  },
  doctorsSpecifications: {
    display: "grid",
    gridGap: "0.2rem 1rem",
    mt: "1rem",
    gridTemplateRows: "auto auto auto",
    gridTemplateColumns: "auto 1fr",
  },
  field: { fontSize: "13px" },
  buttonStyle: {
    gap: "0.5rem",
    bottom: 0,
    display: "flex",
    p: ".8rem",
    position: "absolute",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
    marginLeft: "7rem",
  },
};
