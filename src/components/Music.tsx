import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import ArtistView from "../pages/ArtistView";
import PlayListView from "../pages/PlayListView";
import Tracks from "../pages/Tracks";
import NavBar from "./NavBar";
import { NotFound } from "./NotFound";

const Music = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Tracks />}/>
            <Route path="/playlist/:id" element={<PlayListView />} />
            <Route path="/artist" element={<ArtistView />} />
            <Route path="/artist" element={<ArtistView />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Music;
