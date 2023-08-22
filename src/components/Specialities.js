import React, { useState } from "react";
import SpecialitiesCard from "./pages/SpecialitiesCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import {
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const drawerWidth = 240;

export default function Specialities({ speciality, totalSpeciality }) {
  const itemsPerPage = 8; // Number of items to show per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalSpeciality / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedSpecialities = speciality.slice(startIndex, endIndex);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        pt: 0,
        width: { md: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <section>
        <Box
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            mb: "1rem",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#3f51b5",
              fontSize: { xs: "26px", md: "30px", lg: "36px" },
              fontWeight: "bold",
              flexGrow: 1,
            }}
          >
            {Math.floor(totalSpeciality / 10) * 10}+ Specialities
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridGap: "0.5rem",
              gridTemplateRows: "1fr",
              gridTemplateColumns: "1fr auto",
            }}
          >
            <form className="MuiFormControl-root">
              <TextField
                placeholder="Search a Speciality"
                variant="outlined"
                margin="dense"
                value=""
                aria-invalid="false"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="search specialities">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
            <FormControl variant="outlined" margin="dense">
              {/* <InputLabel htmlFor="select-option">Select Option</InputLabel> */}
              <Select
                inputProps={{
                  name: "option",
                  id: "select-option",
                }}
                value={8}
              >
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                {/* You can add more MenuItem elements here */}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "auto",
              sm: "auto auto",
              lg: "auto auto auto",
            },
            gap: "20px",
          }}
        >
          {displayedSpecialities.map((item, index) => (
            <SpecialitiesCard key={index} content={item} />
          ))}
        </Box>
      </section>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: "1rem",
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
    </Box>
  );
}
