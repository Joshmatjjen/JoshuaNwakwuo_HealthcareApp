import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDoctors } from "../features/doctors/doctorsSlice";
import { AppDispatch, RootState } from "../store";
import "./DoctorCard.css";

const DoctorList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const doctors = useSelector((state: RootState) => state.doctors.doctors);
  const doctorStatus = useSelector(
    (state: RootState) => state?.doctors?.status
  );

  useEffect(() => {
    if (doctorStatus === "idle") {
      dispatch(fetchDoctors());
    }
  }, [doctorStatus, dispatch]);

  return (
    <div>
      <h2>Doctor List</h2>
      {doctorStatus === "loading" && <p>Loading...</p>}
      {doctorStatus === "failed" && <p>Failed to fetch doctors</p>}
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor.id} className="doctor-card">
            <img
              src={`https://picsum.photos/id/${doctor.id}/200/300`}
              alt={doctor.name}
              className="doctor-image"
            />
            <div className="doctor-info">
              <h2 className="doctor-name">{doctor.name}</h2>
              <p className="doctor-specialty">{doctor.specialty}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
