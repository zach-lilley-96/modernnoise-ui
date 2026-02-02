import {type JSX, useState} from 'react';

export default function  SavedFriends (): JSX.Element {
    const [friends, setFriends] = useState<string[]>([]);
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Saved Friends</h2>
      <p className="text-center text-gray-500">Your saved friends will appear here.</p>
        <p className="text-center text-gray-500">This feature is currently in development.</p>

    </div>
  );
};

