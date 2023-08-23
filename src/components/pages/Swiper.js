import { Box, Typography } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styles from "../../styles/swiper.module.css";

const slides = [
  "Dementia",
  "Depression",
  "Diabetes",
  "Diphtheria",
  "Dyslexia",
  "Obesity",
  "Vertigo",
  "Vaginitis",
  "Ulcers",
  "Typhoid",
  "Alcoholism",
  "Anaemia",
  "Arthritis",
  "Asthma",
  // ... other slide names
];

function MySwiperComponent() {
  const breakpoints = {
    320: { slidesPerView: 3 },
    480: { slidesPerView: 4 },
    768: { slidesPerView: 5 },
    1024: { slidesPerView: 8 },
  };

  return (
    <Box
      sx={{
        background: "#F0F0F0",
        height: "3rem",
        display: "flex",
        alignItems: "center",
      }}
      overflow="hidden"
    >
      <Swiper
        breakpoints={breakpoints}
        spaceBetween={12}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        className={styles.swiper}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className={styles["swiper-slide"]}>
            <Typography>{slide}</Typography>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default MySwiperComponent;
