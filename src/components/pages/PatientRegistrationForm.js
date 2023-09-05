import React, { useEffect, useState } from "react";
import styles from "../../styles/patient_register.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { days, months, years } from "../../utils/date";
import { Link } from "react-router-dom";
import { checkIfExists, signUpPatient } from "../../api";
import { Alert } from "@mui/material";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "male",
    day: "",
    month: "",
    year: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [inputErrors, setInputErrors] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordChecks, setPasswordChecks] = useState({
    isOpen: false,
    lowercase: "",
    uppercase: "",
    specialChar: "",
    number: "",
    passwordLength: "",
    match: "",
  });
  const [alert, setAlert] = useState(null);

  const handleInputChange = async (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "contactNumber" || name === "email") {
      try {
        const response = await checkIfExists(value, name);

        setInputErrors((prev) => ({
          ...prev,
          [name]:
            response.code === 433
              ? name === "contactNumber"
                ? "Mobile number already exists!"
                : "Email already exists!"
              : "",
        }));
      } catch (error) {
        console.error("Error:", error);
        setInputErrors((prev) => ({
          ...prev,
          [name]: `Error checking ${name}`,
        }));
      }
    } else if (name === "password" || name === "confirmPassword") {
      if (!value) {
        setInputErrors((prev) => ({
          ...prev,
          [name]: "Password cannot be empty!",
        }));
      } else {
        validateInput(event);
      }
    }
  };

  const validateInput = async (e) => {
    let { name, value } = e.target;
    if (name === "contactNumber" || name === "email") {
      try {
        const response = await checkIfExists(value, name);
        setInputErrors((prev) => {
          const stateObj = { ...prev, [name]: "" };
          switch (name) {
            case "contactNumber":
              if (!value || !/^[0-9]{10}$/.test(value)) {
                stateObj[name] = "Please enter a valid 10-digit mobile number!";
              } else {
                if (response.code === 433) {
                  stateObj[name] = "Mobile number already exists!";
                } else {
                  stateObj[name] = "";
                }
              }
              break;

            case "email":
              if (!value || !/\S+@\S+\.\S+/.test(value)) {
                stateObj[name] = "Please enter a valid e-mail address!";
              } else {
                if (response.code === 433) {
                  stateObj[name] = "Email already exists!";
                } else {
                  stateObj[name] = "";
                }
              }
              break;
            default:
              break;
          }
          return stateObj;
        });
      } catch (error) {
        console.error("Error:", error);
        setInputErrors((prev) => ({
          ...prev,
          [name]: `Error checking ${name}`,
        }));
      }
    } else {
      setInputErrors((prev) => {
        const stateObj = { ...prev, [name]: "" };

        switch (name) {
          case "fullName":
            if (!value) {
              stateObj[name] = "Please enter a valid name!";
            } else {
              stateObj[name] = "";
            }
            break;
          case "password":
            if (!value) {
              stateObj[name] = "Password cannot be empty!";
            } else {
              validatePassword(value);
              stateObj[name] = "";
            }
            break;

          case "confirmPassword":
            if (!value) {
              stateObj[name] = "Please enter Confirm Password.";
            } else if (formData.password && value === formData.password) {
              setPasswordChecks((prev) => {
                return { ...prev, match: "checked" };
              });
              stateObj[name] = "";
            } else {
              setPasswordChecks((prev) => {
                return { ...prev, match: "unchecked" };
              });
              stateObj[name] = "";
            }
            break;

          default:
            break;
        }

        return stateObj;
      });
    }
  };

  const validatePassword = (value) => {
    setPasswordChecks((prev) => {
      const passwordObj = { ...prev };
      // Check lowercase letter
      if (!/[a-z]/.test(value)) {
        passwordObj.lowercase = "unchecked";
      } else {
        passwordObj.lowercase = "checked";
      }
      // Check uppercase letter
      if (!/[A-Z]/.test(value)) {
        passwordObj.uppercase = "unchecked";
      } else {
        passwordObj.uppercase = "checked";
      }
      // Check special character
      if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value)) {
        passwordObj.specialChar = "unchecked";
      } else {
        passwordObj.specialChar = "checked";
      }

      // Check number
      if (!/[0-9]/.test(value)) {
        passwordObj.number = "unchecked";
      } else {
        passwordObj.number = "checked";
      }
      // Check length
      if (value.length < 6) {
        passwordObj.passwordLength = "unchecked";
      } else {
        passwordObj.passwordLength = "checked";
      }

      // Check password match
      if (formData.password !== formData.confirmPassword) {
        passwordObj.match = "unchecked";
      } else {
        passwordObj.match = "checked";
      }
      return passwordObj;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for unfilled inputs and set errors
    const newInputErrors = {};
    for (const field in formData) {
      if (formData[field] === "") {
        newInputErrors[field] = "Please fill this data!";
      }
    }
    setInputErrors(newInputErrors);
    const userName = formData.fullName.split(" ");
    const userDetails = {
      firstName: userName[0],
      lastName: userName[1],
      gender: formData.gender,
      email: formData.email,
      password: formData.password,
      contactNumber: formData.contactNumber,
      profile: {
        dob: `${formData.year}-${formData.month}-${formData.day.padStart(
          2,
          "0"
        )}`,
      },
    };
    const response = await signUpPatient(userDetails);
    if (response.enabled) {
      setAlert(<Alert severity="success">Signed up successfully!</Alert>);
    } else {
      setAlert(
        <Alert severity="error">Registration failed. Please try again.</Alert>
      );
    }
    setFormData({
      fullName: "",
      gender: "male",
      day: "",
      month: "",
      year: "",
      contactNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setPasswordChecks({
      isOpen: false,
      lowercase: "",
      uppercase: "",
      specialChar: "",
      number: "",
      passwordLength: "",
      match: "",
    });
  };

  const handlePasswordCheck = () => {
    setPasswordChecks((prev) => {
      return { ...prev, isOpen: true };
    });
  };

  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const currentDay = currentDate.getDate().toString();

    setFormData((prevData) => ({
      ...prevData,
      day: currentDay,
      month: currentMonth,
      year: currentYear.toString(),
    }));
  }, []);

  return (
    <div className={styles.registration_form_container}>
      {alert}
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
            onBlur={validateInput}
            className={`${styles.input} ${
              inputErrors.fullName ? styles.errorBorder : ""
            }`}
            required
          />
          {inputErrors.fullName && (
            <p className={styles.error}>{inputErrors.fullName}</p>
          )}
        </div>
        <div className={styles.registration_form_child}>
          <FormControl>
            <FormLabel id="demo-customized-radios" sx={{ color: "#000" }}>
              Gender*
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
               
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
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
              {days.map((day, index) => (
                <option key={index} value={day}>
                  {day}
                </option>
              ))}
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
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            placeholder="Enter Mobile Number"
            onBlur={validateInput}
            className={`${styles.input} ${
              inputErrors.contactNumber ? styles.errorBorder : ""
            }`}
            maxLength="10"
            required
          />
          {inputErrors.contactNumber && (
            <p className={styles.error}>{inputErrors.contactNumber}</p>
          )}
        </div>
        <div className={styles.registration_form_child}>
          <label className={styles.label_tag}>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            className={`${styles.input} ${
              inputErrors.email ? styles.errorBorder : ""
            }`}
            onChange={handleInputChange}
            onBlur={validateInput}
            placeholder="abc@gmail.com"
            required
          />
          {inputErrors.email && (
            <p className={styles.error}>{inputErrors.email}</p>
          )}
        </div>
        <div className={styles.registration_form_child}>
          <label className={styles.label_tag}>Create Password*</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            className={`${styles.input} ${
              inputErrors.password ? styles.errorBorder : ""
            }`}
            onChange={handleInputChange}
            onBlur={validateInput}
            onClick={handlePasswordCheck}
            placeholder="create password"
            required
          />
          {inputErrors.password && (
            <p className={styles.error}>{inputErrors.password}</p>
          )}
        </div>
        <div className={styles.registration_form_child}>
          <label className={styles.label_tag}>Confirm Password*</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            className={styles.input}
            onChange={handleInputChange}
            onBlur={validateInput}
            placeholder="confirm password"
            required
          />
        </div>
        {passwordChecks.isOpen && (
          <div>
            <p className={styles.icon}>
              {passwordChecks.lowercase === "" ? (
                <CircleOutlinedIcon color="primary" />
              ) : passwordChecks.lowercase === "checked" ? (
                <CheckCircleOutlineOutlinedIcon color="success" />
              ) : (
                <CancelOutlinedIcon color="error" />
              )}
              Must contain lowercase letter.
            </p>

            <p className={styles.icon}>
              {passwordChecks.uppercase === "" ? (
                <CircleOutlinedIcon color="primary" />
              ) : passwordChecks.uppercase === "checked" ? (
                <CheckCircleOutlineOutlinedIcon color="success" />
              ) : (
                <CancelOutlinedIcon color="error" />
              )}
              Must contain uppercase letter.
            </p>

            <p className={styles.icon}>
              {passwordChecks.specialChar === "" ? (
                <CircleOutlinedIcon color="primary" />
              ) : passwordChecks.specialChar === "checked" ? (
                <CheckCircleOutlineOutlinedIcon color="success" />
              ) : (
                <CancelOutlinedIcon color="error" />
              )}
              Mustcontain at least one special character.
            </p>

            <p className={styles.icon}>
              {passwordChecks.number === "" ? (
                <CircleOutlinedIcon color="primary" />
              ) : passwordChecks.number === "checked" ? (
                <CheckCircleOutlineOutlinedIcon color="success" />
              ) : (
                <CancelOutlinedIcon color="error" />
              )}
              Must contain at least one number.
            </p>

            <p className={styles.icon}>
              {passwordChecks.passwordLength === "" ? (
                <CircleOutlinedIcon color="primary" />
              ) : passwordChecks.passwordLength === "checked" ? (
                <CheckCircleOutlineOutlinedIcon color="success" />
              ) : (
                <CancelOutlinedIcon color="error" />
              )}
              Must contain at least 6 characters.
            </p>

            <p className={styles.icon}>
              {passwordChecks.match === "" ? (
                <CircleOutlinedIcon color="primary" />
              ) : passwordChecks.match === "checked" ? (
                <CheckCircleOutlineOutlinedIcon color="success" />
              ) : (
                <CancelOutlinedIcon color="error" />
              )}
              Passwords must match.
            </p>
          </div>
        )}
        <Button
          sx={{ width: "6rem", mt: 2 }}
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          disabled={
            !(
              passwordChecks.lowercase === "checked" &&
              passwordChecks.match === "checked" &&
              passwordChecks.uppercase === "checked" &&
              passwordChecks.number === "checked" &&
              passwordChecks.passwordLength === "checked" &&
              passwordChecks.specialChar === "checked" &&
              inputErrors.fullName === "" &&
              inputErrors.contactNumber === "" &&
              inputErrors.email === "" &&
              inputErrors.password === "" &&
              inputErrors.confirmPassword === ""
            )
          }
        >
          REGISTER
        </Button>
        <p>
          Already have an account? <Link to="/auth/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
