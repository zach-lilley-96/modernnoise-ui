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
        <div className="container mx-auto p-4 text-center">
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Enter artist name" 
            />
            <button type="submit">Search</button>
        </form>

        {error && <p style={{color: 'red'}}>{error}</p>}

        {artists.length > 0 && (
            <ul>
                {artists.map((artist: any) => (
                        <div key={artist.strMusicBrainzID}
                            onClick={() => navigate(`/artist/${artist.strMusicBrainzID}`)}
                            style={{cursor: 'pointer', border: '1px solid black', margin: '10px', padding: '10px'}}
                        >
                            <li key={artist.strArtist}>{artist.strArtist}</li>
                            <li key={artist.strGenre}>{artist.strGenre}</li>
                            <li key={artist.intFormedYear}>{artist.intFormedYear}</li>
                        </div>
                    
                ))}
            </ul>
        )}
        </div>
    );

}