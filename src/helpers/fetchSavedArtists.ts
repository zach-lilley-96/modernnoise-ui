export async function fetchSavedArtists(page: number = 0, size: number = 10) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URI}/rating/artists?page=${page}&size=${size}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export default fetchSavedArtists;


export type SavedArtist = {
    strArtist: string;
    strGenre: string;
    strArtistThumb: string;
    strMusicBrainzID: string;
    intFormedYear: number;

};