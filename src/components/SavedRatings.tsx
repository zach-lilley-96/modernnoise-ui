import {useEffect, useState, useMemo} from "react";
import {useParams} from "react-router-dom";
import type {SavedRatingsDto} from "../types/SavedRatingsDto";
import fetchSavedAlbums from "../helpers/fetchSavedAlbums";
import fetchFriendSavedAlbums from "../helpers/fetchFriendSavedAlbums";

const TIER_CONFIG = [
    {label: "S", min: 9.5, color: "bg-purple-500"},
    {label: "A", min: 8, color: "bg-green-400"},
    {label: "B", min: 6, color: "bg-orange-400"},
    {label: "C", min: 5, color: "bg-blue-400"},
    {label: "D", min: 3.5, color: "bg-yellow-400"},
    {label: "F", min: 0, color: "bg-red-400"},
];

export default function SavedRatings() {
    const {id, friendCode} = useParams<{ id: string, friendCode?: string }>();
    const [ratings, setRatings] = useState<SavedRatingsDto[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getSavedAlbums() {
            if (id) {
                try {
                    const data = friendCode 
                        ? await fetchFriendSavedAlbums(friendCode, id)
                        : await fetchSavedAlbums(id);
                    setRatings(data);
                } catch (error) {
                    setError(`Could not fetch saved albums for artist with ID ${id}.`);
                    console.error("Error fetching saved albums:", error);
                }
            }
        }

        getSavedAlbums();
    }, [id]);

    const tieredRatings = useMemo(() => {
        const tiers: Record<string, SavedRatingsDto[]> = {
            S: [], A: [], B: [], C: [], D: [], F: []
        };

        ratings.forEach(rating => {
            if (rating.score >= 9) tiers.S.push(rating);
            else if (rating.score >= 7.5) tiers.A.push(rating);
            else if (rating.score >= 6) tiers.B.push(rating);
            else if (rating.score >= 5) tiers.C.push(rating);
            else if (rating.score >= 4) tiers.D.push(rating);
            else tiers.F.push(rating);
        });

        return tiers;
    }, [ratings]);

    if (error) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (ratings.length === 0) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-gray-500">No saved albums found for this artist.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{ratings[0].album.strArtist} Ratings</h2>

            <div className="flex flex-col gap-2 bg-gray-900 p-2 rounded-lg">
                {TIER_CONFIG.map((tier) => (
                    <div key={tier.label} className="flex min-h-30 bg-gray-800 rounded-sm overflow-hidden">
                        <div
                            className={`w-24 shrink-0 flex items-center justify-center text-4xl font-bold text-black ${tier.color}`}>
                            {tier.label}
                        </div>
                        <div className="grow p-2 flex flex-wrap gap-4 items-center">
                            {tieredRatings[tier.label].map((rating) => (
                                <div key={rating.album.strMusicBrainzID}
                                     className="group relative w-20 h-20 shadow-lg hover:scale-110 transition-transform duration-200">
                                    <img
                                        src={rating.album.strAlbumThumb}
                                        alt={rating.album.strAlbum}
                                        className="w-full h-full object-cover rounded-sm"
                                    />
                                    <div
                                        className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-1 text-center pointer-events-none">
                                        <p className="text-[10px] font-bold text-white leading-tight truncate w-full">{rating.album.strAlbum}</p>
                                        <p className="text-[10px] text-gray-300">{rating.score}</p>
                                    </div>
                                </div>
                            ))}
                            {tieredRatings[tier.label].length === 0 && (
                                <span className="text-gray-600 italic text-sm ml-2">No albums</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8">
            {!friendCode && (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-10 rounded focus:outline-none focus:shadow-outline w-96 h-12 text-2xl"
                    onClick={() => window.location.href = `/artist/${id}`}>
                    Edit Ratings
                </button>
            )}
            </div>
        </div>
    );
}