import { useDispatch } from "react-redux";
import { setTracks } from "../store/musicSlice";
import useFetch from "../utils/fetch";
import Box from "@mui/material/Box";
import LoadingSpinner, { RefreshingCard } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import { Alert, Grid, Typography } from "@mui/material";
import SongCard from "./SongCard";

export default function PlayListView() {
  const dispatch = useDispatch();
  const param: any = useParams();
  const { isLoading, isRefreshing, isSuccess, data,isError } = useFetch(
    `/playlist?limit=20&index=1&id=${param.id}`,
    "playlist"
  );
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isSuccess) {
    dispatch(setTracks(data.data));
  }
  if (isRefreshing) {
    return <RefreshingCard message="Refreshing playlist...." />;
  }

  return (
    <Box sx={{ width: "80%", margin: "auto" }}>
      {isError && (
          <Alert className="error-container" severity="error">
           "An error has pccured while getting the play list, please retry"
          </Alert>
        )}
      <Box
        sx={{
          backgroundImage: `url(${data.picture_big})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          minHeight: "50vh",
        }}
      />
      <Box sx={{ flexGrow: 1, marginTop: 1, marginLeft: 1 }}>
        <Typography
          variant="h1"
          sx={{ width: "100%", textAlign: "center", padding: 3 }}
        >
          Songs
        </Typography>
        <Grid container spacing={{ xs: 1, sm: 1, md: 3 }}>
          {isSuccess &&
            data.tracks.data.map((song: any, index: number) => (
              <Grid item xs={12} sm={12} md={4} lg={3} key={index}>
                <SongCard song={song} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
