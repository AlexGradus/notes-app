import { DBSchema } from "idb";

export interface NoteItemProps {
  id: string;
  text: string;
}

export interface Note {
  id: string;
  text: string;
}

export interface NotesDB extends DBSchema {
  notes: {
    key: string;
    value: Note;
  };
}

export interface TagHighlighterProps {
  text: string;
}

export interface Note {
  id: string;
  text: string;
}

export interface NotesState {
  notes: Note[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
