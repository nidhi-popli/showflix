import { CircularProgress, Box } from "@mui/material";

function Loader() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <CircularProgress color="primary" />
    </Box>
  );
}

export default Loader;
