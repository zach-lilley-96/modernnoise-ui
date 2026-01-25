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
    <div className="container mx-auto p-4">
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.25rem" }}>
          Search artists
        </h1>
        <p style={{ color: "rgba(0,0,0,0.65)", marginBottom: "1rem" }}>
          Type an artist name and select a result to view albums.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "center",
            background: "#fff",
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 14,
            padding: "0.75rem",
            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 18,
              height: 18,
              color: "rgba(0,0,0,0.55)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "0 0 auto",
            }}
          >
            {/* Magnifying glass */}
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="currentColor"
                d="M10 18a8 8 0 1 1 5.293-14.01A8 8 0 0 1 10 18Zm0-2a6 6 0 1 0-4.243-1.757A6 6 0 0 0 10 16Zm8.707 4.121-4.37-4.37 1.414-1.414 4.37 4.37-1.414 1.414Z"
              />
            </svg>
          </span>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by artist name…"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "1rem",
              background: "transparent",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "0.6rem 0.9rem",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "#111827",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Search
          </button>
        </form>

        {error && (
          <div
            role="alert"
            style={{
              marginTop: "0.75rem",
              padding: "0.75rem 0.9rem",
              borderRadius: 12,
              border: "1px solid rgba(239,68,68,0.35)",
              background: "rgba(239,68,68,0.08)",
              color: "rgb(185,28,28)",
              fontWeight: 600,
            }}
          >
            {error}
          </div>
        )}

        {artists.length > 0 && (
          <div
            style={{
              marginTop: "1rem",
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: 16,
              background: "#fff",
              overflow: "hidden",
              boxShadow: "0 10px 20px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                padding: "0.75rem 1rem",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                background: "rgba(0,0,0,0.02)",
                fontWeight: 800,
              }}
            >
              Results ({artists.length})
            </div>

            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {artists.map((artist: any) => (
                <li
                  key={artist.strMusicBrainzID}
                  onClick={() => navigate(`/artist/${artist.strMusicBrainzID}`)}
                  style={{
                    cursor: "pointer",
                    padding: "0.9rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 800,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {artist.strArtist}
                    </div>
                    <div style={{ color: "rgba(0,0,0,0.65)", fontSize: "0.95rem" }}>
                      {[artist.strGenre, artist.intFormedYear].filter(Boolean).join(" • ")}
                    </div>
                  </div>

                  <div
                    aria-hidden="true"
                    style={{ color: "rgba(0,0,0,0.45)", flex: "0 0 auto" }}
                    title="Open artist"
                  >
                    {/* Chevron right */}
                    <svg width="18" height="18" viewBox="0 0 24 24">
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
    </div>
  );
}