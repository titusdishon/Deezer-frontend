import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Track } from "../store/musicSlice";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
  track: Track;
};
const TrackCard: React.FC<Props> = ({
  track,
}: Props) => {


  return (
    <Card sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width:'70%' }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {track.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {track.title}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Link to={`/playlist/${track.id}`} style={{textDecoration:'none'}}>
          <Button variant="outlined">
            View Play List
          </Button>
          </Link>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: '30%' }}
        image={track?.picture_big}
        alt={track.title}
      />
    </Card>
  );
};
export default TrackCard;
