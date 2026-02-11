

import {useEffect, useState} from "react";
import type {ArtistDto} from "../types/ArtistDto.ts";
import {Link, useParams} from "react-router-dom";
import fetchFriendSavedArtists from "../helpers/fetchFriendSavedArtists.ts";

export default function FriendSavedArtists() {
    const {friendCode} = useParams<{friendCode: string}>();
    const [artists, setArtists] = useState<ArtistDto[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const pageSize = 12;

    useEffect(() => {
        if (!friendCode) return;
        async function fetchRequest() {
            fetchFriendSavedArtists(friendCode!, page, pageSize)
                .then(data => {
                    setArtists(data.content);
                    setTotalPages(data.totalPages);
                })
                .catch(err => {
                    console.error("Error fetching saved artists:", err);
                    setError("Failed to load saved artists.");
                });
        }

        fetchRequest();
    }, [page]);

    if (error) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (artists.length === 0) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-gray-500">No saved artists found.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-slate-100">Saved Artists</h2>

            {artists.length === 0 ? (
                <p className="text-gray-500 dark:text-slate-400 text-center">No saved artists found.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {artists.map((artist) => (
                                <Link
                                    key={artist.strMusicBrainzID}
                                    to={`/friends/${friendCode}/artists/${artist.strMusicBrainzID}`}
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