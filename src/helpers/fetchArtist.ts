
export async function getArtists(artistName: string) {
  const response = await fetch(`http://localhost:8080/search/artist/
${encodeURIComponent(artistName)}`, {
  credentials: "include",
});
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function getAlbumsByArtist(artistId: string) {
  const response = await fetch(`http://localhost:8080/search/albums/${encodeURIComponent(artistId)}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
}