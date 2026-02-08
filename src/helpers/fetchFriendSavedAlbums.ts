import type {SavedRatingsDto} from "../types/SavedRatingsDto.ts";

export default async function fetchFriendSavedAlbums(friendCode: string, artistId: string): Promise<SavedRatingsDto[]> {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URI}rating/friend-ratings/${artistId}?friendCode=${friendCode}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json() as SavedRatingsDto[];
}
