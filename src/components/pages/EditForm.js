import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Grid, TextField, MenuItem } from "@mui/material";
import { useState } from "react";

export default function EditForm({ editing }) {
  const [value, setValue] = useState(dayjs("2022-04-17"));
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    bloodType: "",
    area: "",
    city: "",
    country: "",
    locality: "",
    pincode: "",
    state: "",
  });
  const userData = JSON.parse(localStorage.getItem("userContext") || "null");
  const inputHandleChange = (event) => {
    const { name, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDatePicker = (value) => {
    value = dayjs(value).format("YYYY-MM-DD");
    console.log(value);
    setEditData((prev) => {
      return { ...prev, dob: value };
    });
  };
  console.log(userData?.user?.gender);
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
          value={userData?.user?.firstName}
          disabled={!editing}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Phone Number"
          name="contactNumber"
          value={userData?.user?.contactNumber}
          disabled
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Email"
          name="email"
          value={userData?.user?.email}
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
          value="male"
          disabled={!editing}
        >
          {genders.map((option, index) => (
            <MenuItem key={index} value={option}>
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
              value={dayjs(userData?.user?.profile?.dob) || null}
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
          value={userData?.user?.bloodgroup}
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
          value={userData?.user?.address1}
          disabled={!editing}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-required"
          name="locality"
          label="colony/Street/Locality"
          value={userData?.user?.address2}
          disabled={!editing}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="City"
          name="city"
          value={userData?.user?.city}
          disabled={!editing}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="State"
          name="state"
          value={userData?.user?.state}
          disabled={!editing}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Country"
          name="country"
          value={userData?.user?.country}
          disabled={!editing}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Pincode"
          name="pincode"
          value={userData?.user?.pincode}
          disabled={!editing}
        />
      </Grid>
    </Grid>
  );
}
const genders = ["Male", "Female", "Other"];
const bloodGroups = ["A+", "A-", "B+", "AB-", "AB+", "O+", "O-"];
