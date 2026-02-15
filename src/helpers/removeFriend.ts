export default async function removeFriend(friendCode: string) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URI}friends`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({friendCode}),
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return ;
}