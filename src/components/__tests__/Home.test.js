import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // Import the jest-dom extension

import Home from "../Home";

// Mock any dependencies or props as needed
const speciality = []; // Example data
const totalSpeciality = 0; // Example data
const doctorsData = []; // Example data
const totalDoctors = 0; // Example data

afterEach(() =>  {
  cleanup();
});

test("it should render the Home component", () => {
  // Render the component
  render(
    <Home
      speciality={speciality}
      totalSpeciality={totalSpeciality}
      doctorsData={doctorsData}
      totalDoctors={totalDoctors}
    />
  );

  // Check if a specific element is present in the rendered component
  const specialitiesElem = screen.getByTestId("doctors-container");
  expect(specialitiesElem).toBeInTheDocument();
});
