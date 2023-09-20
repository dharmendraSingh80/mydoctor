import {
  Box,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";
const startOfQ11900 = dayjs("1900-01-01T00:00:00.000");
const endOfQ12023 = dayjs(new Date());
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;

export default function ExperiencePaper({
  item,
  index,
  editing,
  removePaper,
  editErrors,
  inputHandleChange,
  validateInput,
  setDateErrors,
  handleDatePicker,
  errorMessage,
}) {
  const [isSwitch, setIsSwitch] = useState(item.fromMonth && !item.toMonth);

  return (
    <>
      {editing && (
        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Box>
            <IconButton onClick={removePaper} sx={{ mt: "15px" }}>
              <CloseIcon color="primary" />
            </IconButton>
          </Box>
        </Box>
      )}
      <Paper
        key={index}
        variant="outlined"
        sx={{ display: "flex", flexWrap: "wrap", mt: "10px" }}
      >
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Paper elevation={0} square={false}>
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Position"
                  name="position"
                  error={editErrors[index]?.position}
                  sx={{ width: "70%", mt: "5%", ml: "15%", mb: "5%" }}
                  value={item.position || ""}
                  disabled={!editing}
                  onChange={(e) => inputHandleChange(e, index)}
                  onBlur={(e) => validateInput(e, index)}
                  helperText={editErrors[index]?.position || ""}
                />
              </div>
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Hospital/Clinic"
                  name="place"
                  error={editErrors[index]?.place}
                  sx={{
                    width: "70%",
                    mt: "5%",
                    ml: "15%",
                    mb: "5%",
                  }}
                  value={item.place || ""}
                  disabled={!editing}
                  onBlur={(e) => validateInput(e, index)}
                  onChange={(e) => inputHandleChange(e, index)}
                  helperText={editErrors[index]?.place || ""}
                />
              </div>
            </Paper>
          </Grid>

          <Grid item md={6} xs={12}>
            <Paper elevation={0} square={false}>
              <Box
                sx={{
                  display: "flex",
                  mt: "5px",
                  alignItems: "center",
                  ml: "18%",
                  mb: "10px",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DatePicker", "DatePicker", "DatePicker"]}
                  >
                    <DatePicker
                      sx={{ ml: "3%" }}
                      views={["month", "year"]}
                      format="MM/YYYY"
                      onError={(newError) => setDateErrors(newError)}
                      value={
                        item.fromMonth
                          ? dayjs(
                              new Date(item.fromYear, item.fromMonth - 1, 1)
                            )
                          : dayjs(new Date(year, month - 1, 1))
                      }
                      slotProps={{
                        textField: {
                          helperText: errorMessage,
                        },
                      }}
                      onChange={(value) =>
                        handleDatePicker(value, "startDate", index)
                      }
                      minDate={startOfQ11900}
                      maxDate={endOfQ12023}
                      disabled={!editing}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <Typography
                  sx={{
                    color: "#696969",
                    fontSize: "15px",
                    fontWeight: 540,
                    ml: "15px",
                  }}
                >
                  Start Date*
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: "5px",
                  alignItems: "center",
                  ml: "18%",
                  mb: "10px",
                }}
              >
                <FormControlLabel
                  control={<Switch />}
                  checked={isSwitch}
                  label="Currently working"
                  disabled={!editing}
                  onChange={() => setIsSwitch(!isSwitch)}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  mt: "5px",
                  alignItems: "center",
                  ml: "18%",
                  mb: "10px",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={["DatePicker", "DatePicker", "DatePicker"]}
                  >
                    <DatePicker
                      sx={{ ml: "3%" }}
                      views={["month", "year"]}
                      format="MM/YYYY"
                      onError={(newError) => setDateErrors(newError)}
                      value={
                        item.toYear
                          ? dayjs(new Date(item.toYear, item.toMonth - 1, 1))
                          : dayjs(new Date(year, month - 1, 1))
                      }
                      slotProps={{
                        textField: {
                          helperText: errorMessage,
                        },
                      }}
                      onChange={(value) =>
                        handleDatePicker(value, "endDate", index)
                      }
                      minDate={startOfQ11900}
                      maxDate={endOfQ12023}
                      disabled={!editing || isSwitch}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <Typography
                  sx={{
                    color: "#696969",
                    fontSize: "15px",
                    fontWeight: 540,
                    ml: "15px",
                  }}
                >
                  End Date
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
