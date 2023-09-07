import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getNumbersOfSlots } from "../../api";

const card = (content, nextAvailableDay) => {
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

          <Box sx={{ flexGrow: 1, flexShrink: 1 }}>
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
              <Typography sx={{ color: "#4caf50", fontSize: "13px" }}>
                {nextAvailableDay ? nextAvailableDay : "..."}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </React.Fragment>
  );
};

export default function OutlinedCard({ content }) {
  const [numSlots, setNumSlots] = useState([]);
  const [nextAvailableDay, setNextAvailableDay] = useState(null);

  const navigate = useNavigate();
  const handleBookAppointment = () => {
    const id = content._id;
    navigate(`/doctor/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Wait for the first useEffect to fetch data and setNumSlots
      await getNumbersOfSlots(content._id).then((data) => {
        setNumSlots(data.data);
      });

      // Once numSlots is set, you can proceed with your logic
      const currentDateTime = new Date();
      const millisecondsInADay = 24 * 60 * 60 * 1000;
      const millisecondsInAWeek = 7 * millisecondsInADay;
      const tomorrowDateTime = new Date(
        currentDateTime.getTime() + millisecondsInADay
      );

      let nextAvailableDay = "";

      for (const appointment of numSlots) {
        const startTime = new Date(appointment.startTime);

        if (startTime < currentDateTime) {
          continue;
        }

        if (
          startTime.getFullYear() === tomorrowDateTime.getFullYear() &&
          startTime.getMonth() === tomorrowDateTime.getMonth() &&
          startTime.getDate() === tomorrowDateTime.getDate()
        ) {
          nextAvailableDay = "Tomorrow";
          break;
        } else if (startTime < tomorrowDateTime) {
          nextAvailableDay = "Today";
          break;
        } else if (
          startTime <= new Date(currentDateTime.getTime() + millisecondsInAWeek)
        ) {
          const dayNames = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const dayIndex = startTime.getDay();
          nextAvailableDay = dayNames[dayIndex];
          break;
        } else {
          nextAvailableDay = "Next Week";
          break;
        }
      }

      // Set the next available day
      setNextAvailableDay(nextAvailableDay);
    };

    fetchData(); // Call the async function
  }, [content._id, nextAvailableDay]);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" onClick={handleBookAppointment} sx={styles.card}>
        {card(content, nextAvailableDay)}
        <Box sx={styles.buttonStyle}>
          <Button
            size="small"
            sx={styles.button}
            color="primary"
            variant="outlined"
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
    height: "92%",
    cursor: "pointer",
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
    flexFlow: "nowrap",
    alignItems: "flex-start",
    marginLeft: "7rem",
  },
  button: {
    flexGrow: 0,
    flexShrink: 0,
    borderRadius: "25px",
  },
};
