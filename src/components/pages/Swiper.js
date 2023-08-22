import React from "react";
import { Typography, Box } from "@mui/material";
import Carousel from "@mui/material/Carousel";
import CarouselItem from "@mui/material/CarouselItem";

const medicalConditions = [
  "Dementia",
  "Depression",
  "Diphtheria",
  // ... other conditions
];

export default function MedicalConditionsCarousel() {
  return (
    <Box>
      <Typography variant="h6">Medical Conditions</Typography>
      <Carousel>
        {medicalConditions.map((condition, index) => (
          <CarouselItem key={index}>
            <Typography variant="body1">{condition}</Typography>
          </CarouselItem>
        ))}
      </Carousel>
    </Box>
  );
}
