import { Box } from "@mui/material";
import Tabs from "./Tabs";

export default function Login({ setUserData }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Tabs setUserData={setUserData} />
    </Box>
  );
}
