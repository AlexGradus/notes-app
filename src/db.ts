import { openDB, IDBPDatabase } from "idb";
import { Note, NotesDB } from "./interfaces/interfaces";

let dbPromise: Promise<IDBPDatabase<NotesDB>> | null = null;

async function openNotesDB(): Promise<IDBPDatabase<NotesDB>> {
  if (!dbPromise) {
    dbPromise = openDB<NotesDB>("notes-app-db", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("notes")) {
          db.createObjectStore("notes", { keyPath: "id" });
        }
      },
    });
  }
  return dbPromise;
}

export async function getAllNotes(): Promise<Note[]> {
  const db = await openNotesDB();
  return db.getAll("notes");
}

export async function addNoteToDB(note: Note): Promise<void> {
  const db = await openNotesDB();
  await db.add("notes", note);
}

export async function updateNoteInDB(note: Note): Promise<void> {
  const db = await openNotesDB();
  await db.put("notes", note);
}

export async function deleteNoteFromDB(id: string): Promise<void> {
  const db = await openNotesDB();
  await db.delete("notes", id);
}
