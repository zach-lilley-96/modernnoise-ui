import {useState} from "react";
import fetchUserByFriendCode from "../helpers/fetchUserByFriendCode.ts";
import addNewFriend from "../helpers/addNewFriend.ts";

export default function FriendCodeInput({ onFriendAdded }: { onFriendAdded: () => void }) {
    const [friendCode, setFriendCode] = useState("");
    const [foundDisplayName, setFoundDisplayName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    async function findUserByFriendCode() {
        setError(null);
        setSuccessMessage(null);
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
            setSuccessMessage(`Successfully added ${foundDisplayName}!`);
            setFriendCode("");
            setFoundDisplayName("");
            onFriendAdded();
        } catch (error) {
            console.error("Error adding friend by friend code:", error);
            setError("Failed to add friend by friend code");
        }
    }

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 mb-8">
            <label htmlFor="friendCode" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                Search Friend Code
            </label>
            <div className="flex gap-2">
                <input
                    id="friendCode"
                    type="text"
                    value={friendCode}
                    onChange={(e) => setFriendCode(e.target.value)}
                    placeholder="Enter friend code..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-transparent dark:text-slate-100"
                />
                <button
                    onClick={findUserByFriendCode}
                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm"
                >
                    Search
                </button>
            </div>
            
            {error && (
                <p className="mt-3 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-red-600 dark:bg-red-500 rounded-full"></span>
                    {error}
                </p>
            )}

            {successMessage && (
                <p className="mt-3 text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-green-600 dark:bg-green-500 rounded-full"></span>
                    {successMessage}
                </p>
            )}
            
            {foundDisplayName && (
                <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800/30 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">Found user</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-slate-100">{foundDisplayName}</p>
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