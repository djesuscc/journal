import { db } from "../firebase/firebase-config"

export const loadNotes = async (uid) => {
  const notesSnap = await db.collection(`${uid}/journal/notes`).get();
  let notes = [];
  notesSnap.forEach((value) => {
    notes.push({ id: value.id, ...value.data() })
  });

  return notes;
}