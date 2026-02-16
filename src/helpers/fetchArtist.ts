import { redirect } from "react-router";
import type {ArtistDto} from "../types/ArtistDto.ts";

export async function getArtists(artistName: string) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URI}search/artist/
${encodeURIComponent(artistName)}`, {
  credentials: "include",
});
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json() as ArtistDto[];
}

export async function getAlbumsByArtist(artistId: string) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URI}search/albums/${encodeURIComponent(artistId)}`, {
    credentials: "include",
  });
  if (response.status === 404) {
    return [];
  }

  if (response.status === 401) {
    return redirect('/login');
  }

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
}