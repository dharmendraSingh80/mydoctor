import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import finalBannerImg from "../myIcon/final banner.svg";
import SpecialitiesCard from "./pages/SpecialitiesCard";
import DoctorsCard from "./pages/DoctorsCard";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../styles/loader.css";

const drawerWidth = 255;
export default function Home({
  speciality,
  totalSpeciality,
  doctorsData,
  totalDoctors,
}) {
  const itemsPerPage = 8; // Number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(doctorsData.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedDoctors = doctorsData.slice(startIndex, endIndex);

  useEffect(() => {
    // Simulate a delay to demonstrate loader
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <Box
      data-testid="doctors-container"
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        pt: 1,
        width: { md: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Box>
        <img src={finalBannerImg} alt="final banner" />
      </Box>
      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <section>
            <Box
              sx={{
                color: "#3f51b5",
                fontSize: "42px",
                mt: "16px",
                fontWeight: "bold",
              }}
            >
              {Math.floor(totalSpeciality / 10) * 10}+ Specialities
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  lg: "1fr 1fr 1fr",
                },
                gap: "54px",
              }}
            >
              {speciality.slice(0, 6).map((item, index) => (
                <SpecialitiesCard key={index} content={item} />
              ))}
            </Box>
            <Box
              sx={{
                textAlign: { xs: "center", md: "end" },
                p: "1rem 0 0 0",
                fontSize: "20px",
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  marginRight: "1.3rem",
                }}
                to="/specialities"
              >
                View all Specialities...
              </Link>
            </Box>
          </section>
          <section id="doctors">
            <Box>{Math.floor(totalDoctors / 10) * 10}+ Doctors</Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  lg: "1fr 1fr 1fr",
                },
                gridGap: "1.8rem",
              }}
            >
              {displayedDoctors.map((item, index) => (
                <DoctorsCard key={index} content={item} />
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: "16px",
              }}
            >
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
                />
              </Stack>
            </Box>
          </section>
        </>
      )}
    </Box>
  );
}
