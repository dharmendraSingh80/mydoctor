import React, { useState } from "react";
import styles from "../../styles/patient_register.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    day: "",
    month: "",
    year: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // Handle form submission logic here
  };
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    // ... and so on for all months
  ];

  const years = [
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    // ... and so on for all years
  ];

  return (
    <div className={styles.registration_form_container}>
      <h2 className={styles.form_title}>Create An Account</h2>
      <form className={styles.registration_form} onSubmit={handleSubmit}>
        <div className={styles.registration_form_child}>
          <label className={styles.label_tag}>Full Name*</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            placeholder="Enter name"
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.registration_form_child}>
          <RadioGroup
            row
            aria-labelledby="gender"
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" /> 
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </div>
        <div className={styles.registration_form_child}>
          <label className={styles.label_tag}>Date of Birth*</label>
          <div>
            <select
              name="day"
              value={formData.day}
              onChange={handleInputChange}
              className={styles.input_DOB}
              required
            >
              <option value="">Day</option>
              {/* Add options for days */}
            </select>
            <select
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              className={styles.input_DOB}
              required
            >
              <option value="">Month</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className={styles.input_DOB}
              required
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.registration_form_child}>
          <label className={styles.label_tag}>Mobile Number*</label>
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            className={styles.input}
            placeholder="Enter Mobile Number"
            required
          />
        </div>
        <div className={styles.registration_form_child}>
          <label className={styles.label_tag}>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            className={styles.input}
            onChange={handleInputChange}
            placeholder="abc@gmail.com"
            required
          />
        </div>
        <div className={styles.registration_form_child}>
          <label className={styles.label_tag}>Create Password*</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            className={styles.input}
            onChange={handleInputChange}
            placeholder="create password"
            required
          />
        </div>
        <div className={styles.registration_form_child}>
          <label className={styles.label_tag}>Confirm Password*</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            className={styles.input}
            onChange={handleInputChange}
            placeholder="confirm password"
            required
          />
        </div>
        <Button
          sx={{ width: "6rem" }}
          type="submit"
          variant="contained"
          disabled
        >
          REGISTER
        </Button>
        <p>
          Already have an account? <a href="/">Sign in</a>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
