import axios from 'axios';
import { AppThunk } from '../../store';
import {
  addAppointmentStart,
  addAppointmentSuccess,
  addAppointmentFailure,
} from './appointmentsSlice';

interface Appointment {
  id: number;
  doctorId: string;
  patientName: string;
  date: string;
}

export const addAppointment =
  (appointment: Omit<Appointment, 'id'>): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(addAppointmentStart());
      const backendEndpoint = 'http://localhost:3001';
      const response = await axios.post(
        backendEndpoint + '/appointments',
        appointment,
      );
      dispatch(addAppointmentSuccess(response.data));
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        dispatch(addAppointmentFailure(error.response.data.message));
      } else {
        dispatch(addAppointmentFailure('Something went wrong'));
      }
    }
  };
