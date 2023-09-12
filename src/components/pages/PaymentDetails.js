import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import visaIcon from "../../myIcon/visa.svg";
import maestroIcon from "../../myIcon/maestro.svg";
import westernUnionIcon from "../../myIcon/western_union.svg";
import unionpayIcon from "../../myIcon/unionpay.svg";
import americanExpressIcon from "../../myIcon/american_express.svg";
import masterCardIcon from "../../myIcon/master_card.svg";
import jcbIcon from "../../myIcon/jcb.svg";

export default function PaymentDetails() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const years = [];
  for (let year = currentYear; year <= 2053; year++) {
    years.push({ value: year.toString(), label: year.toString() });
  }
  return (
    <Box
      sx={{
        border: "0.5px solid lightGrey",
        p: "1.4rem",
        marginTop: "1rem",
        minHeight: "40vh",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Accepted Credit/Debit Cards</Typography>
          <img
            src={visaIcon}
            alt="visa"
            style={{ width: "10%", marginLeft: "2%" }}
          />
          <img src={maestroIcon} alt="visa" />
          <img src={westernUnionIcon} alt="visa" />
          <img src={unionpayIcon} alt="visa" />

          <img src={americanExpressIcon} alt="visa" />
          <img src={masterCardIcon} alt="visa" />
          <img src={unionpayIcon} alt="visa" />
          <img src={jcbIcon} alt="visa" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Credit/Debit Card Number"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            id="fullWidth"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-select-currency"
            select
            label="Expiration month"
            defaultValue="09 | September"
          >
            {months.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="outlined-select-currency"
            select
            label="Expiration year"
            defaultValue="2023"
          >
            {years.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Security code"
            placeholder="XXXX"
            id="fullWidth"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

const months = [
  { value: "01", label: "01 | January" },
  { value: "02", label: "02 | February" },
  { value: "03", label: "03 | March" },
  { value: "04", label: "04 | April" },
  { value: "05", label: "05 | May" },
  { value: "06", label: "06 | June" },
  { value: "07", label: "07 | July" },
  { value: "08", label: "08 | August" },
  { value: "09", label: "09 | September" },
  { value: "10", label: "10 | October" },
  { value: "11", label: "11 | November" },
  { value: "12", label: "12 | December" },
];
