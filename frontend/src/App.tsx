import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import DoctorList from "./components/DoctorList";
import AppointmentForm from "./components/AppointmentForm";
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Doctor Appointment System</h1>
        <DoctorList />
        <AppointmentForm />
      </div>
    </Provider>
  );
};

export default App;
