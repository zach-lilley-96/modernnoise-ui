export default async function fetchUserByFriendCode(friendCode: string) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URI}friends/search`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendCode })
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}