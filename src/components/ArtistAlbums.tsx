import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import type {AlbumDto} from "../types/AlbumDto";
import type {RatingDto} from "../types/RatingDto";
import {getAlbumsByArtist} from "../helpers/fetchArtist";
import StarRating from "./StarRating";
import type SaveRequest from "../types/SaveRequest.ts";

export default function ArtistAlbums() {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const [albums, setAlbums] = useState<AlbumDto[]>([]);
    const [removedAlbums, setRemovedAlbums] = useState<AlbumDto[]>([]);
    const [ratings, setRatings] = useState<RatingDto[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchAlbums() {
            if (id) {
                console.log("Fetching albums for artist ID:", id);
                try {
                    const data = await getAlbumsByArtist(id);
                    console.log("Fetched albums data:", data);
                    setAlbums(data);
                } catch (error) {
                    setError(`Could not fetch albums for artist with ID ${id}.`);
                    console.error("Error fetching albums:", error);
                }
            }
        }

        fetchAlbums();
    }, [id]);

    const submitRatings = async () => {
        const saveRequest: SaveRequest = {
            ratings: ratings
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URI}rating/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(saveRequest),
                credentials: "include",
            });

            if (!response.ok) {
                setError(`Failed to submit rating: ${response.status} ${response.statusText}`);
            }
            console.log("Rating submitted successfully.");
            navigate("/my-ratings/" + id, {replace: true});
        } catch (error) {
            setError(`Failed to submit rating: ${error}`);
        }
    }

    const handleRatingChange = (albumId: string, score: number) => {
        setRatings((prev) => {
            const existing = prev.find((r) => r.albumId === albumId);
            if (existing) {
                return prev.map((r) => (r.albumId === albumId ? {...r, score} : r));
            }
            return [...prev, {albumId, score}];
        });
    };

    const removeAlbum = (albumId: string) => {
        const albumToRemove = albums.find((a) => a.strMusicBrainzID === albumId);
        if (albumToRemove) {
            setRemovedAlbums((prev) => [...prev, albumToRemove]);
            setAlbums((prev) => prev.filter((a) => a.strMusicBrainzID !== albumId));
            setRatings((prev) => prev.filter((r) => r.albumId !== albumId));
        }
    };

    const restoreAlbum = (albumId: string) => {
        const albumToRestore = removedAlbums.find((a) => a.strMusicBrainzID === albumId);
        if (albumToRestore) {
            setAlbums((prev) => [...prev, albumToRestore]);
            setRemovedAlbums((prev) => prev.filter((a) => a.strMusicBrainzID !== albumId));
        }
    };

    if (albums.length === 0 && removedAlbums.length === 0 && !error) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-gray-500">No albums found for this artist.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-6xl font-bold mb-3 text-center mt-5 text-gray-900 dark:text-slate-100">
                {albums.length > 0 ? albums[0].strArtist : (removedAlbums.length > 0 ? removedAlbums[0].strArtist : 'Artist')} Albums
            </h2>

            {error && <p className="text-red-500 dark:text-red-400">{error}</p>}

            <div className="flex justify-center mt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {albums.map((album) => {
                        const albumRating = ratings.find(r => r.albumId === album.strMusicBrainzID)?.score || 0;

                        let bgColor = "bg-gray-100 dark:bg-slate-800";
                        if (albumRating > 0) {
                            bgColor = albumRating >= 6 ? "bg-green-100 dark:bg-green-900/40" : "bg-red-100 dark:bg-red-900/40";
                        }
                        if (albumRating == 10) {
                            bgColor = "bg-yellow-100 dark:bg-yellow-900/40";
                        }

                        return (
                            <div
                                key={album.strMusicBrainzID}
                                className={`relative rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-transparent dark:border-slate-700/50 ${bgColor}`}
                            >
                                <button
                                    onClick={() => removeAlbum(album.strMusicBrainzID)}
                                    className="absolute top-2 right-2 z-10 bg-white/90 dark:bg-slate-700/90 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 text-red-600 dark:text-red-400 rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-sm transition-colors cursor-pointer"
                                    aria-label="Remove album"
                                >
                                    &times;
                                </button>
                                <div className="p-4">
                                    <h3 className="font-bold text-lg truncate text-gray-900 dark:text-slate-100">{album.strAlbum}</h3>
                                    <p className="text-gray-500 dark:text-slate-400">{album.intYearReleased}</p>
                                </div>

                                <div className="relative w-full h-64 overflow-hidden">
                                    <img
                                        src={album.strAlbumThumb}
                                        alt={album.strAlbum}
                                        className="object-cover w-full h-full"
                                    />
                                    {/* Horizontal Rating Bar - Over the image */}
                                    <div className="absolute bottom-2 left-0 right-0 flex justify-center z-10">
                                        <div className="bg-black/60 backdrop-blur-md rounded-full px-3 py-1 shadow-lg">
                                            <StarRating
                                                value={albumRating}
                                                onChange={(rating) =>
                                                    handleRatingChange(album.strMusicBrainzID, rating)
                                                }
                                                max={10}
                                                orientation="horizontal"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 flex flex-col items-center min-h-[4rem] justify-center">
                                    <div className="group flex items-center justify-center gap-3">
                                        {albumRating > 0 && (
                                            <span
                                                className="text-lg font-bold text-gray-800 dark:text-slate-100 bg-white/90 dark:bg-slate-700 border border-black/10 dark:border-white/10 rounded-full px-4 py-1 shadow-sm transition"
                                                aria-label={`Selected rating ${albumRating} out of 10`}
                                            >
                                                {albumRating} / 10
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button
                    onClick={submitRatings}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-10 rounded focus:outline-none focus:shadow-outline w-96 h-12 text-2xl cursor-pointer"
                >
                    Submit Ratings
                </button>
            </div>

            {removedAlbums.length > 0 && (
                <div className="mt-12 border-t border-gray-300 dark:border-slate-700 pt-8">
                    <h3 className="text-3xl font-bold mb-6 text-center text-gray-500 dark:text-slate-400">Removed Albums</h3>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {removedAlbums.map((album) => (
                                <div
                                    key={album.strMusicBrainzID}
                                    className="relative rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
                                >
                                    <button
                                        onClick={() => restoreAlbum(album.strMusicBrainzID)}
                                        className="absolute top-1 right-1 z-10 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-md hover:bg-green-600 transition-colors cursor-pointer"
                                        aria-label="Restore album"
                                    >
                                        +
                                    </button>
                                    <div className="p-2">
                                        <h4 className="font-bold text-sm truncate text-gray-700 dark:text-slate-300">{album.strAlbum}</h4>
                                    </div>
                                    <div className="relative w-full h-32 overflow-hidden">
                                        <img
                                            src={album.strAlbumThumb}
                                            alt={album.strAlbum}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
