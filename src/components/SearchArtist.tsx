import React,{ useState } from "react";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import useFetch from "../utils/fetch";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Skeleton,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setArtist } from "../store/musicSlice";
import { Redirect } from "react-router-dom";

type Props = {
  open: boolean;
  toggleOpen: () => void;
};

const SearchArtist: React.FC<Props> = ({ open, toggleOpen }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const dispatch = useDispatch();

  const { data, isSuccess, isLoading } = useFetch(
    `/search-artist?query=${query}`,
    ["products", query],
    {
      enabled: Boolean(query !== ""),
    }
  );
  const onArtistSelect = (artist: any) => {
    dispatch(setArtist(artist));
    setRedirect(true);
    setTimeout(() => {
        toggleOpen();
    }, 200);
  };

  if (redirect) {
    return <Redirect to="/artist" />;
  }

  return (
      <Dialog
       role="search-box"
        open={open}
        onClose={toggleOpen}
        aria-labelledby="alert-dialog-title"
        maxWidth="sm"
        fullWidth
        aria-describedby="alert-dialog-description"
      >
       
        <Card sx={{ width: "100%", height: "400px" }}>
          <Paper
            component="form"
            sx={{
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              value={query || ""}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search artist name"
              inputProps={{ "aria-label": "search artist name", "data-testid": "search-artist-input" }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>
          {isSuccess && (
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                height: "100px",
              }}
            >
              {data.data.map((artist: any) => (
                <ListItem
                  alignItems="flex-start"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    onArtistSelect(artist);
                 
                  }}
                  key={artist.id}
                >
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={artist?.picture_small} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={artist.name}
                    secondary={
                      <React.Fragment>
                        {artist.nb_fan} fans
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
          {isLoading&&<List>
            {
              [1, 2, 3, 4, 5].map((i) => (
                <ListItem alignItems="flex-start" sx={{ padding: "2px" }}  key={i}>
                  <Skeleton
                    animation="wave"
                    sx={{ width: "100%", padding: "25px" }}
                  />
                </ListItem>
              ))}
          </List>}
          <List>
            {data?.data?.length === 0 && (
              <ListItem  >
               <Alert sx={{ padding: "2px", width:'100%' }} severity="warning">No record found</Alert>
            </ListItem>)}
          </List>
        </Card>
      </Dialog>
  );
};
export default SearchArtist;
