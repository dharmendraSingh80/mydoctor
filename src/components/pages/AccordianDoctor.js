import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "./Rating";

export default function ControlledAccordions({ content }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={styles.container}>
      <p style={{ fontSize: "1.1rem" }}>
        Consultation Fee: Rs.{" "}
        {content?.profile?.consultationFee
          ? content.profile.consultationFee
          : "Not available"}
      </p>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography fontWeight="bolder" sx={{ width: "33%", flexShrink: 0 }}>
            Specialities
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>
              {content?.profile?.specialities
                ? content.profile.specialities.map((speciality) => (
                    <li key={speciality._id}>{speciality.name}</li>
                  ))
                : "No specialities available"}
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography fontWeight="bolder" sx={{ width: "33%", flexShrink: 0 }}>
            Qualifications
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>
              {content?.profile?.qualifications
                ? content.profile.qualifications.map((qualification, index) => (
                    <li key={index}>
                      {qualification.name}, {qualification.institute}.
                      {qualification.year}
                    </li>
                  ))
                : "No qualifications available"}
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography fontWeight="bolder" sx={{ width: "33%", flexShrink: 0 }}>
            Experience
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>
              {content?.profile?.experience
                ? content.profile.experience.map((experience, index) => (
                    <li key={index}>
                      {experience.position} at {experience.place} (
                      {experience.fromYear} - {experience.toYear || "Present"})
                    </li>
                  ))
                : "No experience"}
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography fontWeight="bolder" sx={{ width: "33%", flexShrink: 0 }}>
            Languages
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>
              {content?.profile?.languages
                ? content.profile.languages.map((language, index) => (
                    <li key={index}>{language}</li>
                  ))
                : "No language available"}
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography fontWeight="bolder" sx={{ width: "33%", flexShrink: 0 }}>
            Reviews
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>No reviews available</ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography fontWeight="bolder" sx={{ width: "33%", flexShrink: 0 }}>
            Write a review
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Rating />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    padding: "12px",
    maxWidth: "100%",
    backgroundColor: "#fff",
  },
};
