import { createSlice } from "@reduxjs/toolkit";

export interface GenState {
  tracks?: Track[];
  searchResults?: SearchQuery[];
  artist?: Artist;
}

export interface User {
  id: number;
  name: string;
  tracklist: string;
  type: string;
}
export interface Track {
  checksum: string;
  creation_date: string;
  id: string;
  link: string;
  md5_image: string;
  nb_tracks: number;
  picture: string;
  picture_big: string;
  picture_medium: string;
  picture_small: string;
  picture_type: string;
  picture_xl: string;
  public: boolean;
  title: string;
  tracklist: string;
  type: string;
  user: User;
}

export interface Album {
  cover: string;
  cover_big: string;
  cover_medium: string;
  cover_small: string;
  cover_xl: string;
  id: number;
  md5_image: string;
  title: string;
  tracklist: string;
  type: string;
}

export interface Artist {
  id: number;
  link: string;
  name: string;
  picture: string;
  picture_big: string;
  picture_medium: string;
  picture_small: string;
  picture_xl: string;
  tracklist: string;
  type: string;
}
export interface SearchQuery {
  artist?: Artist;
  album?: Album;
  duration: 243;
  explicit_content_cover: number;
  explicit_content_lyrics: number;
  explicit_lyrics: boolean;
  id: number;
  link: string;
  md5_image: string;
  preview: string;
  rank: number;
  readable: boolean;
  title: string;
  title_short: string;
  type: string;
}

const initialState: GenState = {
};

const musicSlice = createSlice({
  initialState,
  name: "music",
  reducers: {
    setTracks: (state, { payload }) => {
      state.searchResults = payload;
    },
    setArtist: (state, { payload }) => {
      state.artist = payload;
    },
  },
});

export const { setTracks,setArtist } = musicSlice.actions;
export default musicSlice.reducer;
