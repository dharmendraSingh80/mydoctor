import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalenderSlots({ handleCalender, appointmentTime }) {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={handleCalender}
        value={appointmentTime.date}
        minDate={value}
      />
    </div>
  );
}

export default CalenderSlots;
