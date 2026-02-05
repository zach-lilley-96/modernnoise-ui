import { type JSX, useEffect, useState } from 'react';
import fetchFriends from '../helpers/fetchFriends';
import fetchNewFriendCode from '../helpers/fetchNewFriendCode';
import type { FriendDto } from '../types/FriendDto';

export default function SavedFriends(): JSX.Element {
  const [friends, setFriends] = useState<FriendDto[]>([]);
  const [friendCode, setFriendCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFriends() {
      fetchFriends().then((data) => {
        setFriends(data);
      }).catch((error) => {
        console.error("Error loading friends:", error);
      });
    }
    loadFriends();
  }, []);

  async function handleGetFriendCode() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNewFriendCode();
      setFriendCode(data.friendCode || data.code || JSON.stringify(data));
    } catch (err: any) {
      setError("Failed to get friend code");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Saved Friends</h2>

      <div className="mb-8 flex flex-col items-center">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mb-2"
          onClick={handleGetFriendCode}
          disabled={loading}
        >
          {loading ? 'Getting Friend Code...' : 'Get Friend Code'}
        </button>
        {friendCode && (
          <div className="mt-2 text-lg font-mono text-green-700">Your Friend Code: {friendCode}</div>
        )}
        {error && (
          <div className="mt-2 text-red-600">{error}</div>
        )}
      </div>

      <ul className="space-y-4">
        {friends.map((friend) => (
          <li key={friend.friendCode} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold">{friend.displayName}</h3>
            <p className="text-gray-600">Friend Code: {friend.friendCode}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

