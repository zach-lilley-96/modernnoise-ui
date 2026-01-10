import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { AlbumDto } from "../types/AlbumDto";
import { getAlbumsByArtist } from "../helpers/fetchArtist";
import StarRating from "./StarRating";

export default function ArtistAlbums() {
  const { id } = useParams<{ id: string }>();
  const [albums, setAlbums] = useState<AlbumDto[]>([]);
  const [ratings, setRatings] = useState<Record<string, number>>({});
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
  }, []);

  const handleRatingChange = (albumId: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [albumId]: rating }));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Albums</h2>

      {error && <p className="text-red-500">{error}</p>}

        {albums.length === 0 && !error && (
          <p className="text-gray-500">No albums found for this artist.</p>
        )}
      <div className="flex justify-center items-center min-h-screen">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album) => (
          <div
            key={album.strMusicBrainzID}
            className={` rounded-lg shadow-md overflow-hidden hover:shadow-xl transition ${ratings[album.strMusicBrainzID] < 7 ? 'bg-red-300' : 'bg-green-300'}`}
          >
            <div className="p-4">
              <h3 className="font-bold text-lg truncate">{album.strAlbum}</h3>
              <p className="text-gray-500">{album.intYearReleased}</p>
            </div>

            <div className="w-full h-64 overflow-hidden">
              <img
                src={album.strAlbumThumb}
                alt={album.strAlbum}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Rating Section */}
            <div className="p-4">
              <StarRating
                value={ratings[album.strMusicBrainzID] || 0}
                onChange={(rating) =>
                  handleRatingChange(album.strMusicBrainzID, rating)
                }
                max={10}
              />
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
