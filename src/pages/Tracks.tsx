import { useDispatch } from "react-redux";
import { setTracks, Track } from "../store/musicSlice";
import useFetch from "../utils/fetch";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TrackCard from "./TrackCard";
import LoadingSpinner, { RefreshingCard } from "../components/LoadingSpinner";
import { Alert, Typography } from "@mui/material";
import { PaginationOutlined } from "../components/Pagination";
import { useState } from "react";
import { useQueryClient } from "react-query";

export default function Tracks() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [index, setIndex] = useState<string>("1");
  const { isLoading, isRefreshing, isSuccess, isError, data } = useFetch(
    `/charts?limit=50&index=${index}`,
    ["charts", index],
    {
      enabled: Boolean(index !== ""),
    }
  );
  if (isLoading || isRefreshing) {
    return <LoadingSpinner />;
  }
  if (isRefreshing) {
    return <RefreshingCard message="Refreshing playlist...." />;
  }
  if (isSuccess) {
    dispatch(setTracks(data.data));
  }
  const handleChange = (value: number) => {
    setIndex(value.toString());
    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey.includes("charts"),
    });
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1, marginTop: 1, width:'80%', margin:'auto' }}>
        {isError && (
          <Alert className="error-container" severity="error">
            "An error has pccured while getting the play list, please retry"
          </Alert>
        )}
        <Typography
          variant="h1"
          sx={{ width: "100%", textAlign: "center", padding: 3 }}
        >
          PLAYLISTS
        </Typography>
        <Grid container spacing={{ xs: 1, sm: 1, md: 3 }}>
          {isSuccess &&
            data?.playlists?.data?.map((track: Track, index: number) => (
              <Grid item xs={12} sm={12} md={4} lg={3} key={index}>
                <TrackCard track={track} />
              </Grid>
            ))}
        </Grid>
      </Box>
      {data?.playlists?.data.length < 1 ? (
        <Alert
          sx={{
            width: "50%",
            textAlign: "center",
            margin: "20px auto",
            padding: 3,
          }}
          variant="outlined"
          severity="info"
        >
          {" "}
          No records found
        </Alert>
      ) : null}
      <PaginationOutlined
        setValue={handleChange}
        count={10}
        page={parseInt(index, 10)}
      />
    </div>
  );
}
