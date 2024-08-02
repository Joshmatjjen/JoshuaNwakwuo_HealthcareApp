import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import doctorsReducer from "./features/doctors/doctorsSlice";
import appointmentsReducer from "./features/appointments/appointmentsSlice";

export const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    appointments: appointmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
