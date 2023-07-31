import {
  configureStore,
  AnyAction,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
