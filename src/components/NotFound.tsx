import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export const NotFound = () => {
  return (
    <Box textAlign="center" sx={{ marginTop: "10%" }}>
      <SentimentVeryDissatisfiedIcon fontSize="large"  sx={{ width: "200px", height:'200px', color:'gray' }}/>
      <h1>Ooooooops!</h1>
      <h2>That page does not exist or is unavailable for now</h2>
      <Link
        to="/"
        style={{ textDecoration: "none", color: "#ffffff", fontWeight: "bold" }}
        role="home-link"
      >
        <Button variant="contained">Back Home</Button>
      </Link>
    </Box>
  );
};
