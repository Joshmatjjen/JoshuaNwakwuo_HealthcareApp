import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
}

interface DoctorsState {
  doctors: Doctor[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DoctorsState = {
  doctors: [],
  status: 'idle',
  error: null,
};

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async () => {
    const backendEndpoint = 'http://localhost:3001';
    const response = await axios.get(backendEndpoint + '/doctors');
    return response.data;
  },
);

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch doctors';
      });
  },
});

export default doctorsSlice.reducer;
