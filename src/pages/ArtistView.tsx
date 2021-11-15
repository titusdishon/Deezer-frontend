import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { RootState } from "../store/configureStore";
import FolderIcon from "@mui/icons-material/Folder";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from "@mui/material";

export default function ArtistView() {
  const { artist } = useSelector((state: RootState) => state.music);
  console.log(artist);
  return (
    <div>
      <Avatar sx={{ width: "30%", margin: "auto", height:'auto', paddingTop: "10px" }} src={artist?.picture_medium} />
      <Box sx={{ width: "30%", margin: "auto", height:'auto',display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Icon with text
            </Typography>
            <List dense={true}>
              <ListItem>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Single-line item"
                  secondary={"Secondary text"}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
