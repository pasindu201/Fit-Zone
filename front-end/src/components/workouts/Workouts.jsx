import React, { useState, useEffect } from "react";
import Workout from "../workout/Workout";
import axios from "axios";
import "./Workouts.scss";

const Workouts = ({ userName }) => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/exercises/allWorkouts`);
                setWorkouts(response.data);
                console.log('Success Request, Workouts:', response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="workouts">
            {workouts.map((workout, index) => (
                <Workout
                    key={index}
                    workout={workout}
                    userName={userName}
                />
            ))}
        </div>
    );
};

export default Workouts;
