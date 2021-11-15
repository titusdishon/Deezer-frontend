import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { SearchQuery } from "../store/musicSlice";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { DialogActions } from "@mui/material";

type Props = {
  song: SearchQuery;
  open: boolean;
  toggleOpen: () => void;
};

const PreviewDialog: React.FC<Props> = ({
  song,
  open,
  toggleOpen,
}: Props) => {

  return (
    <div>
      <Dialog
        open={open}
        onClose={toggleOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Card sx={{ display: "flex", width: "100%" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "70%" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {song.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {song.artist?.name}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <audio autoPlay={true} controls>
                <source src="horse.ogg" type="audio/ogg" />
                <source src={song.preview} type="audio/mpeg" />
              </audio>
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: "30%" }}
            image={song?.album?.cover_big}
            alt={song?.album?.title}
          />
        </Card>
        <DialogActions sx={{
              display: "flex",
              pl: 1,
              pb: 1,
              float: "left",
            }}>
          <Button onClick={toggleOpen} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default PreviewDialog;
