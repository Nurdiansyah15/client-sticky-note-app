import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    note: [],
  },
  reducers: {
    setNote: (state, action) => {
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
    resetNote: (state) => {
      state.note = [];
    },
  },
});

export const { setNote, addNote, updateNote, deleteNote, resetNote } =
  noteSlice.actions;

export default noteSlice.reducer;
