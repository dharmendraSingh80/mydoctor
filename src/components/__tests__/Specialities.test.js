import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Specialities from "../Specialities";
import { MemoryRouter } from "react-router-dom";

// jest.mock("../pages/SpecialitiesCard", () => {
//   return {
//     __esModule: true,
//     default: function MockSpecialitiesCard({ content }) {
//       return <div data-testid="mock-speciality-card">{content.name}</div>;
//     },
//   };
// });

const mockSpecialityData = [
  {
    _id: "653ccd1502e23a0209d6fa0b",
    name: "Gastroenterology",
    enabled: true,
    reviewed: true,
    deleted: false,
    imageUrl: "/assets/images/specialities/g/gastroenterology.svg",
    __v: 0,
  },
  {
    _id: "653ccd1502e23a0209d6fa04",
    name: "Dental",
    enabled: true,
    reviewed: true,
    deleted: false,
    imageUrl: "/assets/images/specialities/d/dental.svg",
    __v: 0,
  },
];

test("it should render the Specialities component with mock SpecialitiesCard", () => {
  render(
    <MemoryRouter>
      <Specialities
        speciality={mockSpecialityData}
        totalSpeciality={mockSpecialityData.length}
      />
    </MemoryRouter>
  );

  // Check if a specific element is present in the rendered component
  const searchInput = screen.getByPlaceholderText("Search a Speciality");
  expect(searchInput).toBeInTheDocument();

  // Example: Interact with the search input field and assert
  fireEvent.change(searchInput, { target: { value: "Dental" } });
  const dentalSpecialityCard = screen.getByText("Dental");
  expect(dentalSpecialityCard).toBeInTheDocument();
});
