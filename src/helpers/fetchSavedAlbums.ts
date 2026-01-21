import type {SavedRatingsDto} from "../types/SavedRatingsDto.ts";

export default async function fetchSavedAlbums(artistId: string): Promise<SavedRatingsDto[]> {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URI}/rating/my-ratings/${artistId}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const ratings: SavedRatingsDto[] = await response.json();
    return ratings;
}