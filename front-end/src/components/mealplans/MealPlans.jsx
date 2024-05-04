import React, { useState, useEffect } from "react";
import MealPlan from "../mealplan/MealPlan";
import axios from "axios";
import "./MealPlans.scss";

const MealPlans = ({ userName }) => {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/allMealPlanes`);
        console.log('Fetched data:', response.data);

        setMealPlans(response.data);
        console.log('Called setMealPlans with data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Log the updated state each time the component re-renders
    console.log('Updated mealPlans state after setMealPlans call:', mealPlans);
  });

  return (
    <div className="mealplanes">
      {mealPlans.map(mealPlan => (
        <MealPlan meal={mealPlan} userName={userName} key={mealPlan.id} />
      ))}
    </div>
  );
};

export default MealPlans;
