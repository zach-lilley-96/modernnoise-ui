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
            navigate("/saved-friends");
        } catch (error) {
            console.error("Error adding friend by friend code:", error);
            setError("Failed to add friend by friend code");
        }

    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
            <label htmlFor="friendCode" className="block text-sm font-medium text-gray-700 mb-2">
                Search Friend Code
            </label>
            <div className="flex gap-2">
                <input
                    id="friendCode"
                    type="text"
                    value={friendCode}
                    onChange={(e) => setFriendCode(e.target.value)}
                    placeholder="Enter friend code..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                <button
                    onClick={findUserByFriendCode}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-sm"
                >
                    Search
                </button>
            </div>
            
            {error && (
                <p className="mt-3 text-sm text-red-600 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-600 rounded-full"></span>
                    {error}
                </p>
            )}
            
            {foundDisplayName && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-blue-600 font-medium">Found user</p>
                        <p className="text-lg font-bold text-gray-900">{foundDisplayName}</p>
                    </div>
                    <button
                        onClick={addFriendByFriendCode}
                        className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                    >
                        Follow {foundDisplayName}
                    </button>
                </div>
            )}
        </div>
    )
}