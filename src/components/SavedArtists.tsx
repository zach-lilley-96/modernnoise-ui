import {useEffect, useState} from "react";
import type {ArtistDto} from "../types/ArtistDto.ts";
import {Link} from "react-router-dom";
import fetchSavedArtists from "../helpers/fetchSavedArtists.ts";
import fetchSearchPage from "../helpers/fetchSearchPage.ts";

export default function SavedArtists() {
    const [artists, setArtists] = useState<ArtistDto[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const pageSize = 12;

    useEffect(() => {
        async function fetchRequest() {
            const fetchPromise = searchQuery.trim() !== ""
                ? fetchSearchPage(searchQuery, page, pageSize)
                : fetchSavedArtists(page, pageSize);

            fetchPromise
                .then(data => {
                    setArtists(data.content);
                    setTotalPages(data.totalPages);
                })
                .catch(err => {
                    console.error("Error fetching artists:", err);
                    setError("Failed to load artists.");
                });
        }

        fetchRequest();
    }, [page, searchQuery]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(0); // Reset to first page on new search
    };

    if (error) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }


    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-slate-100">Saved Artists</h2>

            <div className="mb-8 max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Search saved artists..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
            </div>

            {artists.length === 0 ? (
                <p className="text-gray-500 dark:text-slate-400 text-center">
                    {searchQuery.trim() !== "" ? "No artists found matching your search." : "No saved artists found."}
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {artists.map((artist) => (
                            <Link
                                key={artist.strMusicBrainzID}
                                to={`/my-ratings/${artist.strMusicBrainzID}`}
                                className="block rounded-xl shadow-md overflow-hidden hover:shadow-xl transition bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700/50"
                            >
                                <div className="w-full h-64 overflow-hidden">
                                    <img
                                        src={artist.strArtistThumb}
                                        alt={artist.strArtist}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg truncate text-center text-gray-900 dark:text-slate-100">{artist.strArtist}</h3>
                                    <p className="text-gray-500 dark:text-slate-400 text-center">{artist.strGenre}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center mt-12 gap-4">
                        <button
                            onClick={() => setPage(p => Math.max(0, p - 1))}
                            disabled={page === 0}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-xl disabled:bg-gray-300 dark:disabled:bg-slate-700 disabled:text-gray-500 transition-all font-bold shadow-md shadow-indigo-100 dark:shadow-none"
                        >
                            Previous
                        </button>
                        <span className="font-medium text-gray-700 dark:text-slate-300">
                            Page {page + 1} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                            disabled={page >= totalPages - 1}
                            className="px-6 py-2 bg-indigo-600 text-white rounded-xl disabled:bg-gray-300 dark:disabled:bg-slate-700 disabled:text-gray-500 transition-all font-bold shadow-md shadow-indigo-100 dark:shadow-none"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}