import { useDispatch } from "react-redux";
import { setTracks, Track } from "../store/musicSlice";
import useFetch from "../utils/fetch";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TrackCard from "./TrackCard";
import LoadingSpinner, { RefreshingCard } from "../components/LoadingSpinner";
import { Alert, Typography } from "@mui/material";

export default function Tracks() {
  const dispatch = useDispatch();
  const { isLoading, isRefreshing, isSuccess,isError, data } = useFetch(
    `/charts?limit=50&index=2`,
    "charts"
  );
  if (isLoading||isRefreshing) {
    return <LoadingSpinner />;
  }
  if (isRefreshing) {
    return <RefreshingCard message="Refreshing playlist...."/>;
  }
  if (isSuccess) {
    dispatch(setTracks(data.data));
  }

  return (
    <Box sx={{ flexGrow: 1, marginTop: 1, marginLeft: 1 }}>
            {isError && (
          <Alert className="error-container" severity="error">
           "An error has pccured while getting the play list, please retry"
          </Alert>
        )}
      <Typography variant="h1" sx={{width:'100%', textAlign:'center', padding:3}}>playlist</Typography>
      <Grid container spacing={{ xs: 1, sm: 1, md: 3 }}>
        {isSuccess &&
          data.playlists.data.map((track: Track, index: number) => (
            <Grid item xs={12} sm={12} md={4} lg={3} key={index}>
              <TrackCard track={track} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
