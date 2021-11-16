import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { RootState } from "../store/configureStore";
import {
  Grid,
  Typography,
  Avatar,
  Alert,
} from "@mui/material";
import useFetch from "../utils/fetch";
import SongCard from "./SongCard";

export default function ArtistView() {
  const { artist } = useSelector((state: RootState) => state.music);
  const { data, isLoading, isError,isSuccess } = useFetch(
    `/artist/tracks?limit=50?&index=1&id=${artist?.id}`,
    "tracks-of-an-artist",
    { enabled: artist?.id!==undefined }
  );
  return (
    <div>
      <Avatar
        sx={{ width: "35%", margin: "50px auto", height: "auto" }}
        src={artist?.picture_medium}
      />
            <Typography sx={{ width: "100%", padding:5, margin: "auto", textAlign:"center" }} variant="h2" component="div">
          Name:{artist?.name}
        </Typography>
      <Box>
        <Typography sx={{ width: "80%", padding:5, margin: "auto", textAlign:"center" }} variant="h2" component="div">
          Tracks
        </Typography>
        {isError && (
          <Alert className="error-container" severity="error">
            "An error has pccured while getting the tracks"
          </Alert>
        )}
        {isLoading && <div>Loading...</div>}
        <Box sx={{ width: "80%", margin: "auto" }}>
        <Grid container spacing={{ xs: 1, sm: 1, md: 3 }}>
          {isSuccess &&
            data.data.map((song: any, index: number) => (
              <Grid item  xs={12} sm={12} md={6} lg={4} key={index}>
                <SongCard song={song} />
              </Grid>
            ))}
        </Grid>
        </Box>
      </Box>
    </div>
  );
}
