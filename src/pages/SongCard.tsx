import * as React from "react";
import Box from "@mui/material/Box";
import { Avatar, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PreviewDialog from "./SongPreview";

type Props = {
  song: any;
};
const SongCard: React.FC<Props> = ({ song }: Props) => {
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ marginTop: 1  }}>
      <Grid
        container
        sx={{
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          flexGrow: 1,
          marginTop: 1,
          padding: 2,
          borderRadius:5,
        }}
      >
        <Grid xs={12} sm={12} md={6} lg={6} item>
          <Avatar
            src={song.album.cover_big}
            sx={{ width: 200, height: 200, margin: "auto" }}
          />
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} sx={{ alignContent: "center" }} item>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "5em",
              }}
            >
              <ListItem>
                <ListItemText
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "5em",
                  }}
                  primary="Title:"
                  secondary={song.title}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "5em",
                  }}
                  primary="Artist:"
                  secondary={song.artist.name}
                />
              </ListItem>
            </List>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 1,
              pb: 1,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <IconButton aria-label="play/pause" onClick={toggleOpen}>
              <PlayArrowIcon sx={{ height: 58, width: 58 }} />
            </IconButton>
          </Box>
          {open && (
            <PreviewDialog song={song} toggleOpen={toggleOpen} open={open} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
export default SongCard;
