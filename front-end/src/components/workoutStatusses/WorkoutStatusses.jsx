import React, { useState, useEffect } from "react";
import WorkoutStatus from "../workoutStatus/WorkoutStatus";
import axios from "axios";
import "./WorkoutStatusses.scss";

const WorkoutStatusses = ({ userName }) => {
  const [workoutReports, setWorkoutReport] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/exercise-duration/all`);
        console.log('Fetched workout data:', response.data);
        setWorkoutReport(response.data);
        console.log('Called setMealPlans with data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="workoutreports">
      {workoutReports.map(report => (
        <WorkoutStatus workoutReport={report} userName={userName} key={report.id} />
      ))}
    </div>
  );
};

export default WorkoutStatusses;
