export default async function generateNewFriendCode() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URI}friends/generate`, {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error generating new friend code:", error);
        throw error;
    }
}