const currentDate = new Date();

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const days = Array.from({ length: 31 }, (_, index) => index + 1);

const currentYear = currentDate.getFullYear();
const years = [];

for (let year = currentYear; year >= 1900; year--) {
  years.push({ value: year.toString(), label: year.toString() });
}

export { days, months, years };
