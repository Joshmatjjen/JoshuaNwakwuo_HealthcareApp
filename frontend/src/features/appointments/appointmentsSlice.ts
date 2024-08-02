import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Appointment {
  id: number;
  doctorId: number;
  patientName: string;
  date: string;
}

interface AppointmentsState {
  appointments: Appointment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AppointmentsState = {
  appointments: [],
  status: "idle",
  error: null,
};

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    addAppointmentStart(state) {
      state.status = "loading";
      state.error = null;
    },
    addAppointmentSuccess(state, action: PayloadAction<any[]>) {
      state.status = "succeeded";
      state.appointments = action.payload;
    },
    addAppointmentFailure(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});
export const {
  addAppointmentStart,
  addAppointmentSuccess,
  addAppointmentFailure,
} = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
