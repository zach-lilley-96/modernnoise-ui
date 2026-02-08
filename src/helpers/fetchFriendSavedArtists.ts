export default async function fetchFriendSavedArtists(friendCode: string, page: number = 0, size: number = 10) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URI}rating/friend?friendCode=${friendCode}&page=${page}&size=${size}`, {
        credentials: "include",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

