import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { addAppointment } from "../features/appointments/appointmentsThunks";
import { AppDispatch, RootState } from "../store";

const AppointmentForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { appointments, status, error } = useSelector(
    (state: RootState) => state.appointments
  );
  const [doctorId, setDoctorId] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [popStatus, setPopStatus] = useState<string>("error");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addAppointment({ doctorId, patientName, date }));
    setOpen(true);
  };
  // console.log("result.", appointments);
  // console.log("Status.", status);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setPopStatus("");
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Book an Appointment
        </Typography>
        <TextField
          label="Doctor ID"
          type="number"
          fullWidth
          margin="normal"
          value={doctorId}
          onChange={(e) => {
            let value = e.target.value;
            if (value.length > 1 && value.startsWith('0')) {
              value = value.replace(/^0+/, '');
            }
            setDoctorId(value)}}
        />
        <TextField
          label="Patient Name"
          type="text"
          fullWidth
          margin="normal"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Book
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            display: "flex",
            justifyContent: "center",
          },
        }}
      >
        <Alert
          onClose={handleClose}
          severity={status === "failed" ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {status === "failed" ? error : "Appointment successfully booked!"}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AppointmentForm;
