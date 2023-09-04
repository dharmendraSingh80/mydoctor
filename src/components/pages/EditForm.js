import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Grid, TextField, MenuItem } from "@mui/material";
import { useState } from "react";

export default function EditForm({
  editing,
  handleDatePicker,
  inputHandleChange,
  editData,
}) {
  const [editErrors, setEditErrors] = useState({
    fullName: "",
    area: "",
    city: "",
    country: "",
    locality: "",
    pincode: "",
    state: "",
  });

  const validationPatterns = {
    fullName: /^$|^[^0-9].*$/,
    area: /^$|^[0-9][a-zA-Z0-9\s\/-]*$/,
    locality: /^$|^[0-9][a-zA-Z0-9\s\/-]*$/,
    city: /^$|^[^\d\s]+$/,
    state: /^$|^(?![0-9]+$)[a-zA-Z\s]+$/,
    country: /^$|^[^\d]+$/,
    pincode: /^$|^\d{6}$/,
  };

  const validationMessages = {
    fullName: "Please enter a valid name!",
    area: "Enter a valid street name",
    locality: "Enter a valid locality name",
    city: "Enter a valid city name",
    state: "Enter a valid state name",
    country: "Enter a valid country name",
    pincode: "Enter a valid 6 digit pincode",
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setEditErrors((prev) => {
      const stateObj = { ...prev, [name]: "" };
      const validationPattern = validationPatterns[name];
      if (validationPattern && !validationPattern.test(value)) {
        stateObj[name] = validationMessages[name];
      }
      return stateObj;
    });
  };

  return (
    <Grid
      container
      rowSpacing={4}
      columnSpacing={{ xs: 2, sm: 3, md: 4 }}
      sx={{ mt: "15px" }}
    >
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Name"
          error={editErrors.fullName}
          name="fullName"
          value={editData.fullName}
          onChange={inputHandleChange}
          onBlur={validateInput}
          helperText={editErrors.fullName ? editErrors.fullName : ""}
          disabled={!editing}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Phone Number"
          name="contactNumber"
          value={editData.contactNumber}
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Email"
          name="email"
          value={editData.email}
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          id="outlined-select-currency"
          select
          label="Gender"
          fullWidth
          name="gender"
          value={editData.gender}
          onChange={inputHandleChange}
          disabled={!editing}
        >
          {genders.map((option, index) => (
            <MenuItem key={index} value={option.toLowerCase()}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            sx={{
              overflow: "none",
              paddingTop: 0,
            }}
            components={["DatePicker", "DatePicker"]}
          >
            <DatePicker
              label="Date Of birth"
              value={dayjs(editData.dob) || null}
              sx={{ width: "100%" }}
              name="dob"
              onChange={handleDatePicker}
              format="DD-MM-YYYY"
              disabled={!editing}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          id="outlined-select-currency"
          select
          fullWidth
          name="bloodType"
          label="Bloodgroup"
          onChange={inputHandleChange}
          value={editData.bloodType}
          disabled={!editing}
        >
          {bloodGroups.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="House No./Street/Area"
          name="area"
          error={editErrors.area}
          value={editData.area}
          onChange={inputHandleChange}
          helperText={editErrors.area ? editErrors.area : ""}
          onBlur={validateInput}
          disabled={!editing}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-required"
          name="locality"
          error={editErrors.locality}
          label="colony/Street/Locality"
          value={editData.locality}
          onChange={inputHandleChange}
          helperText={editErrors.locality ? editErrors.locality : ""}
          onBlur={validateInput}
          disabled={!editing}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="City"
          name="city"
          error={editErrors.city}
          value={editData.city}
          onChange={inputHandleChange}
          helperText={editErrors.city ? editErrors.city : ""}
          onBlur={validateInput}
          disabled={!editing}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="State"
          name="state"
          error={editErrors.state}
          value={editData.state}
          onChange={inputHandleChange}
          helperText={editErrors.state ? editErrors.state : ""}
          onBlur={validateInput}
          disabled={!editing}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Country"
          name="country"
          error={editErrors.country}
          value={editData.country}
          onChange={inputHandleChange}
          helperText={editErrors.country ? editErrors.country : ""}
          onBlur={validateInput}
          disabled={!editing}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Pincode"
          name="pincode"
          error={editErrors.pincode}
          value={editData.pincode}
          onChange={inputHandleChange}
          helperText={editErrors.pincode ? editErrors.pincode : ""}
          inputProps={{ maxLength: 6 }}
          onBlur={validateInput}
          disabled={!editing}
        />
      </Grid>
    </Grid>
  );
}
const genders = ["Male", "Female", "Other"];
const bloodGroups = ["A+", "A-", "B+", "AB-", "AB+", "O+", "O-"];
