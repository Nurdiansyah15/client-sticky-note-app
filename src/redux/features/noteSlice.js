import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    note: [],
  },
  reducers: {
    setState: (state, action) => {
      state.note = action.payload;
    },
    addNote: (state, action) => {
      state.note = [...state.note, action.payload];
    },
    updateNote: (state, action) => {
      state.note = state.note.filter((note) => note.id !== action.payload.id);
      state.note = [...state.note, action.payload];
    },
    deleteNote: (state, action) => {
      state.note = state.note.filter((note) => note.id !== action.payload);
    },
  },
});

export const { setState, addNote, updateNote, deleteNote } = noteSlice.actions;

export default noteSlice.reducer;
