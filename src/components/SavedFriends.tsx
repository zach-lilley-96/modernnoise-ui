import { type JSX, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchFriends from '../helpers/fetchFriends';
import fetchNewFriendCode from '../helpers/fetchNewFriendCode';
import removeFriend from '../helpers/removeFriend';
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

  async function handleRemoveFriend(e: React.MouseEvent, friendCode: string, displayName: string) {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm(`Are you sure you want to remove ${displayName}?`)) {
      try {
        await removeFriend(friendCode);
        await loadFriends();
      } catch (err) {
        console.error("Error removing friend:", err);
        setError("Failed to remove friend");
      }
    }
  }
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <header className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-slate-100 mb-2">Friends</h2>
        <p className="text-gray-500 dark:text-slate-400">Manage your connections and find new friends</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100 mb-2">Your Profile Code</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Share this code with others so they can follow you.</p>
          </div>
          
          <div className="space-y-4">
            {friendCode ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-lg text-center">
                <span className="block text-xs uppercase tracking-wider text-green-600 dark:text-green-400 font-semibold mb-1">Your Code</span>
                <code className="text-2xl font-mono font-bold text-green-700 dark:text-green-300">{friendCode}</code>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 dark:bg-slate-900/50 border border-dashed border-gray-300 dark:border-slate-700 rounded-lg text-center">
                <p className="text-sm text-gray-400 dark:text-slate-500 italic">No code generated yet</p>
              </div>
            )}

            <button
              className={`w-full px-6 py-3 font-semibold rounded-lg transition-all shadow-sm ${
                loading 
                  ? 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed' 
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
              <p className="text-sm text-red-600 text-center mt-2 font-medium dark:text-red-400">{error}</p>
            )}
          </div>
        </div>

        <FriendCodeInput onFriendAdded={loadFriends} />
      </div>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-300">Your Friends</h3>
          <span className="px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 text-sm font-medium rounded-full border border-transparent dark:border-slate-700">
            {friends.length} {friends.length === 1 ? 'friend' : 'friends'}
          </span>
        </div>

        {friends.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {friends.map((friend) => (
              <Link
                key={friend.friendCode}
                to={`/friends/${friend.friendCode}/artists`}
                className="p-5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all group block relative"
              >
                <button
                  onClick={(e) => handleRemoveFriend(e, friend.friendCode, friend.displayName)}
                  className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors z-10"
                  aria-label="Remove friend"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-bold text-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {friend.displayName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {friend.displayName}
                    </h3>
                    <p className="text-sm font-mono text-gray-400 dark:text-slate-500 uppercase tracking-tighter">
                      #{friend.friendCode}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700">
            <p className="text-gray-400 dark:text-slate-500 text-lg">You haven't added any friends yet.</p>
            <p className="text-gray-400 dark:text-slate-600 text-sm mt-1">Search for a friend code above to get started!</p>
          </div>
        )}
      </section>
    </div>
  );
};

