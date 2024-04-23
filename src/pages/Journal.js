import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      const entriesQuery = query(collection(db, 'journalEntries'), where("userId", "==", auth.currentUser.uid), orderBy("timestamp", "desc"));
      onSnapshot(entriesQuery, (querySnapshot) => {
        const updatedEntries = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          updatedEntries.push({
            ...data,
            imageUrl: data.url
          });
        });
        setEntries(updatedEntries);
      });
    }
  }, [auth.currentUser]);

  return (
    <div>
      {entries.map((entry, index) => (
        <div key={index}>
          <p>{new Date(entry.timestamp.seconds * 1000).toLocaleString()}</p>
          {entry.imageUrl && <img src={entry.imageUrl} alt="Screenshot" />}
        </div>
      ))}
    </div>
  );
};

export default Journal;
