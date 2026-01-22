import { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router";
import type { AlbumDto } from "../types/AlbumDto";
import type { RatingDto } from "../types/RatingDto";
import { getAlbumsByArtist } from "../helpers/fetchArtist";
import StarRating from "./StarRating";
import type SaveRequest from "../types/SaveRequest.ts";

export default function ArtistAlbums() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [albums, setAlbums] = useState<AlbumDto[]>([]);
  const [ratings, setRatings] = useState<RatingDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect( () => {
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
      navigate("/");
    }
    catch (error) {
      setError(`Failed to submit rating: ${error}`);
    }
  }

      const handleRatingChange = (albumId: string, score: number) => {
        setRatings((prev) => {
          const existing = prev.find((r) => r.albumId === albumId);
          if (existing) {
            return prev.map((r) => (r.albumId === albumId ? { ...r, score } : r));
          }
          return [...prev, { albumId, score }];
        });
      };

  const removeAlbum = (albumId: string) => {
    setAlbums((prev) => prev.filter((a) => a.strMusicBrainzID !== albumId));
    setRatings((prev) => prev.filter((r) => r.albumId !== albumId));
  };

      if (albums.length === 0 && !error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-gray-500">No albums found for this artist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">{albums[0].strArtist} Albums</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-center items-center min-h-screen">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {albums.map((album) => {
              const albumRating = ratings.find(r => r.albumId === album.strMusicBrainzID)?.score || 0;
              
              let bgColor = "bg-gray-200";
              if (albumRating > 0) {
                bgColor = albumRating >= 6 ? "bg-green-300" : "bg-red-300";
              }
              if (albumRating == 10) {
                bgColor = "bg-yellow-300";
              }

                  return (
                    <div
                      key={album.strMusicBrainzID}
                      className={`relative rounded-lg shadow-md overflow-hidden hover:shadow-xl transition ${bgColor}`}
                    >
                      <button
                        onClick={() => removeAlbum(album.strMusicBrainzID)}
                        className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-red-500 hover:text-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-sm transition-colors cursor-pointer"
                        aria-label="Remove album"
                      >
                        &times;
                      </button>
                      <div className="p-4">
                    <h3 className="font-bold text-lg truncate">{album.strAlbum}</h3>
                <p className="text-gray-500">{album.intYearReleased}</p>
              </div>

              <div className="w-full h-58 overflow-hidden">
                <img
                  src={album.strAlbumThumb}
                  alt={album.strAlbum}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Rating Section */}
              <div className="p-4">
                <StarRating
                  value={albumRating}
                  onChange={(rating) =>
                    handleRatingChange(album.strMusicBrainzID, rating)
                  }
                  max={10}
                />
              </div>
            </div>
          );
        })}
      </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={submitRatings}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-10 rounded focus:outline-none focus:shadow-outline w-96 h-12 text-2xl"
        >
          Submit Ratings
        </button>
      </div>
    </div>
  );
}
