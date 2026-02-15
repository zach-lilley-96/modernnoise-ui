export default async function fetchSearchPage(query: string, page: number = 0, size: number = 10) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URI}rating/search-artist?searchTerm=${encodeURIComponent(query)}&page=${page}&size=${size}`,
        {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}