import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import DoctorDetailsCard from "./pages/DoctorDetailsCard";
import AccordionDoctor from "./pages/AccordianDoctor";
import { useEffect, useState } from "react";
import { getDoctorDetails } from "../api";

export default function Doctor() {
  const [doctorDetails, setDoctorDetails] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getDoctorDetails(id).then((data) => {
      setDoctorDetails(data);
    });
  }, []);
  return (
    // <Box sx={styles.main}>
    <Box sx={styles.wrapper}>
      <Box sx={styles.doctorContainer}>
        <Box sx={styles.details}>
          <Box sx={styles.docCard}>
            <DoctorDetailsCard content={doctorDetails} />
          </Box>
          <Box sx={styles.docCard}>
            <Typography>No slot available</Typography>
          </Box>
          <Box sx={styles.accordianDoc}>
            <AccordionDoctor content={doctorDetails} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

const styles = {
  doctorContainer: {
    width: "100%",
    display: "flex",
    // maxWidth: "1300px",
    // marginTop: "30px",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "center",
  },
  wrapper: {
    padding: "40px",
    flexGrow: 1,
    backgroundColor: "#fafafa",
  },
  details: {
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
    width: "calc(100% + 24px)",
    margin: "-12px",
  },
  docCard: {
    padding: "12px",
    flexGrow: 0,
    maxWidth: "50%",
    flexBasis: "50%",
    margin: 0,
    boxSizing: "border-box",
  },
  accordianDoc: {
    padding: "12px",
    flexGrow: 0,
    maxWidth: "100%",
    flexBasis: "100%",
    margin: 0,
    boxSizing: "border-box",
  },
};
