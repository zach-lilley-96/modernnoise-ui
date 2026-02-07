import { useState } from "react"
import { getArtists } from "../helpers/fetchArtist";
import { useNavigate } from "react-router";

export default function SearchArtistForm(){
    const [searchTerm, setSearchTerm] = useState("");
    const [artists, setArtists] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        setError(null);
        e.preventDefault();
        try{
            const response = await getArtists(searchTerm);
            setArtists(response);
        } catch (error) {
            setArtists([]);
            setError(`Artist with name ${searchTerm} not found.`);
            console.error("Error fetching artists:", error);
        }
    }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <header className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Search Artists</h1>
        <p className="text-gray-500">
          Type an artist name and select a result to view albums.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex gap-3 items-center bg-white border border-gray-200 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all"
      >
        <div className="pl-3 text-gray-400">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="currentColor"
              d="M10 18a8 8 0 1 1 5.293-14.01A8 8 0 0 1 10 18Zm0-2a6 6 0 1 0-4.243-1.757A6 6 0 0 0 10 16Zm8.707 4.121-4.37-4.37 1.414-1.414 4.37 4.37-1.414 1.414Z"
            />
          </svg>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by artist name…"
          className="flex-1 border-none outline-none text-lg bg-transparent py-2"
        />

        <button
          type="submit"
          className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all whitespace-nowrap shadow-md shadow-indigo-100"
        >
          Search
        </button>
      </form>

      {error && (
        <div
          role="alert"
          className="mt-4 p-4 rounded-xl border border-red-100 bg-red-50 text-red-700 font-semibold flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
          {error}
        </div>
      )}

      {artists.length > 0 && (
        <div className="mt-8 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 text-gray-800 font-black flex justify-between items-center">
            <span>Results</span>
            <span className="text-sm bg-gray-200 px-2 py-0.5 rounded-full">{artists.length}</span>
          </div>

          <ul className="divide-y divide-gray-50">
            {artists.map((artist: any) => (
              <li
                key={artist.strMusicBrainzID}
                onClick={() => navigate(`/artist/${artist.strMusicBrainzID}`)}
                className="cursor-pointer px-6 py-5 flex items-center justify-between gap-4 hover:bg-indigo-50/30 transition-colors group"
              >
                <div className="min-width-0">
                  <div className="font-bold text-gray-900 text-lg group-hover:text-indigo-600 transition-colors truncate">
                    {artist.strArtist}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {[artist.strGenre, artist.intFormedYear].filter(Boolean).join(" • ")}
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M9.29 6.71a1 1 0 0 0 0 1.41L13.17 12l-3.88 3.88a1 1 0 1 0 1.41 1.41l4.59-4.59a1 1 0 0 0 0-1.41l-4.59-4.59a1 1 0 0 0-1.41 0Z"
                    />
                  </svg>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}