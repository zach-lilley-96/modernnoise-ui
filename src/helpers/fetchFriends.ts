import type { FriendDto } from "../types/FriendDto";

export default async function fetchFriends() {
    try {

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URI}friends/me`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json() as FriendDto[];
    } catch (error) {
        console.error("Error fetching friends:", error);
        throw error;
    }
}