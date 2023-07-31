import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllNotes,
  addNoteToDB,
  updateNoteInDB,
  deleteNoteFromDB,
} from "../db";
import { NotesState, Note } from "../interfaces/interfaces";

const initialState: NotesState = {
  notes: [],
  status: "idle",
  error: null,
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  try {
    const notes = await getAllNotes();
    return notes;
  } catch (error) {
    throw new Error("Error fetching notes from IndexedDB:" + error);
  }
});

export const addNote = createAsyncThunk(
  "notes/addNote",
  async (text: string) => {
    const newNote: Note = {
      id: new Date().getTime().toString(),
      text,
    };
    await addNoteToDB(newNote);
    return newNote;
  }
);

export const editNote = createAsyncThunk(
  "notes/editNote",
  async ({ id, text }: { id: string; text: string }) => {
    await updateNoteInDB({ id, text });
    return { id, text };
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id: string) => {
    await deleteNoteFromDB(id);
    return id;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(editNote.fulfilled, (state, action) => {
        const { id, text } = action.payload;
        const noteIndex = state.notes.findIndex((note) => note.id === id);
        if (noteIndex !== -1) {
          state.notes[noteIndex].text = text;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      });
  },
});

export default notesSlice.reducer;
