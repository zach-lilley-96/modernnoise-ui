import {useState} from "react";
import fetchUserByFriendCode from "../helpers/fetchUserByFriendCode.ts";
import addNewFriend from "../helpers/addNewFriend.ts";
import {useNavigate} from "react-router";

export default function FriendCodeInput() {
    const navigate = useNavigate();
    const [friendCode, setFriendCode] = useState("");
    const [foundDisplayName, setFoundDisplayName] = useState("");
    const [error, setError] = useState<string | null>(null);

    async function findUserByFriendCode() {
        try {
            const data = await fetchUserByFriendCode(friendCode);
            if (data) {
                setFoundDisplayName(data.displayName);
            } else {
                setError("User not found");
            }
        } catch (error) {
            console.error("Error fetching user by friend code:", error);
            setError("Failed to find user by friend code");
        }
    }

    async function addFriendByFriendCode() {
        try {
            await addNewFriend(friendCode);
            navigate("/friends");
        } catch (error) {
            console.error("Error adding friend by friend code:", error);
            setError("Failed to add friend by friend code");
        }

    }

    return (
        <div>
            <input type="text" value={friendCode} onChange={(e) => setFriendCode(e.target.value)}/>
            <button
                onClick={findUserByFriendCode}>
                Search
            </button>
            {error && <p>{error}</p>}
            {foundDisplayName && <div>
                <p>Found user: {foundDisplayName}</p>
                <button onClick={addFriendByFriendCode}>Follow {foundDisplayName}?</button>
            </div>}
        </div>
    )
}