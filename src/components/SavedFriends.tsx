import { type JSX, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchFriends from '../helpers/fetchFriends';
import fetchNewFriendCode from '../helpers/fetchNewFriendCode';
import type { FriendDto } from '../types/FriendDto';
import FriendCodeInput from "./FriendCodeInput.tsx";

export default function SavedFriends(): JSX.Element {
  const [friends, setFriends] = useState<FriendDto[]>([]);
  const [friendCode, setFriendCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadFriends() {
    fetchFriends().then((data) => {
      setFriends(data);
    }).catch((error) => {
      console.error("Error loading friends:", error);
    });
  }

  useEffect(() => {
    loadFriends();
  }, []);

  async function handleGetFriendCode() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNewFriendCode();
      setFriendCode(data.friendCode || data.code);
    } catch (err) {
      console.error("Error fetching friend code:", err);
      setError("Failed to get friend code");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <header className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Friends</h2>
        <p className="text-gray-500">Manage your connections and find new friends</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Your Profile Code</h3>
            <p className="text-sm text-gray-500 mb-4">Share this code with others so they can follow you.</p>
          </div>
          
          <div className="space-y-4">
            {friendCode ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <span className="block text-xs uppercase tracking-wider text-green-600 font-semibold mb-1">Your Code</span>
                <code className="text-2xl font-mono font-bold text-green-700">{friendCode}</code>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-center">
                <p className="text-sm text-gray-400 italic">No code generated yet</p>
              </div>
            )}

            <button
              className={`w-full px-6 py-3 font-semibold rounded-lg transition-all shadow-sm ${
                loading 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]'
              }`}
              onClick={handleGetFriendCode}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-gray-400" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : 'Get My Friend Code'}
            </button>
            
            {error && (
              <p className="text-sm text-red-600 text-center mt-2 font-medium">{error}</p>
            )}
          </div>
        </div>

        <FriendCodeInput onFriendAdded={loadFriends} />
      </div>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Your Friends</h3>
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
            {friends.length} {friends.length === 1 ? 'friend' : 'friends'}
          </span>
        </div>

        {friends.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {friends.map((friend) => (
              <Link
                key={friend.friendCode}
                to={`/friends/${friend.friendCode}/artists`}
                className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {friend.displayName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {friend.displayName}
                    </h3>
                    <p className="text-sm font-mono text-gray-400 uppercase tracking-tighter">
                      #{friend.friendCode}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-lg">You haven't added any friends yet.</p>
            <p className="text-gray-400 text-sm mt-1">Search for a friend code above to get started!</p>
          </div>
        )}
      </section>
    </div>
  );
};

