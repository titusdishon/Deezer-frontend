import { useDispatch } from "react-redux";
import { setTracks } from "../store/musicSlice";
import useFetch from "../utils/fetch";
import Box from "@mui/material/Box";
import LoadingSpinner, { RefreshingCard } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import { Alert, Avatar, Grid, Typography } from "@mui/material";
import SongCard from "./SongCard";
import {PaginationOutlined} from "../components/Pagination";
import { useState } from "react";
import { useQueryClient } from "react-query";

export default function PlayListView() {
  const [index, setIndex]= useState<string>('1');
  const queryClient = useQueryClient()
  const dispatch = useDispatch();
  const param: any = useParams();
  const { isLoading, isRefreshing, isSuccess, data,isError } = useFetch(
    `/playlist?limit=20&index=${index}&id=${param.id}`,
   [ "playlist", index],
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
  const handleChange = (value: number) => {
    setIndex(value.toString());
    queryClient.invalidateQueries({
      predicate: (query) =>
        query.queryKey.includes('playlist')
    });
   } 
  ;

  return (
    <>
    <Box sx={{ width: "80%", margin: "auto" }}>
      {isError && (
          <Alert className="error-container" severity="error">
           "An error has pccured while getting the play list, please retry"
          </Alert>
        )}
      <Avatar sx={{ width: "35%", margin: "50px auto", height: "auto" }} src={data.picture_big} />
      <Box sx={{ width: "80%", margin: "auto" }} >
        <Typography
          variant="h1"
          sx={{ width: "100%", textAlign: "center", padding: 3 }}
        >
          Songs
        </Typography>
        <Grid container spacing={1} >
          {isSuccess &&
            data.tracks.data.map((song: any, index: number) => (
              <Grid item xs={12} sm={12} md={4} lg={3} key={index}>
                <SongCard song={song} />
              </Grid>
            ))}
        </Grid>
      </Box>
     
    </Box>
    {data.tracks.data.length<1?<Alert sx={{width:'50%', textAlign:'center',margin:'20px auto', padding:3}} variant="outlined" severity="info"> No records found</Alert>:null}
      <PaginationOutlined setValue={handleChange} count={10} page={parseInt(index, 10)}/>
    </>
  );
}
