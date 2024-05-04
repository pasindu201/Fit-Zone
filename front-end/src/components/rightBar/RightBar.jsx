import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./rightBar.scss";

const RightBar = ({ userName, profilePic }) => {
    // State to store the form data
    const [formData, setFormData] = useState(null);

    // Function to fetch exercise duration data from the backend
    const fetchTodayStatus = async () => {
        try {
            // Make an API call to fetch exercise duration data for the given user
            const response = await axios.get(`http://localhost:8080/api/exercise-duration/currentUpdate/${userName}`);
            const exerciseDurationData = response.data;

            // Update formData state with the retrieved data
            setFormData(exerciseDurationData);
        } catch (error) {
            console.error('Error fetching exercise duration data:', error);
        }
    };

    // Use useEffect to fetch data when the component mounts and when userName changes
    useEffect(() => {
        // Fetch data when the component mounts
        if (userName) {
            fetchTodayStatus();
        }
    }, [userName]);

    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <div className="user">
                        {profilePic && <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />}
                        <span>{userName}</span>
                    </div>

                    <h4>{userName}'s Current workout status</h4>

                    <form>
                        {formData && (
                            <>
                                <div>
                                <div className="special">
                                  <div key="benchPress">
                                    <label>Time enter into the Gym : </label>
                                    <span>{formData.startTime} </span>
                                  </div>
                                  <div key="benchPress">
                                    <label>Time exit from the Gym : </label>
                                    <span>{formData.endTime} </span>
                                  </div>
                                  <div key="benchPress">
                                    <label>Calories burned : </label>
                                    <span>{formData.calories} calories</span>
                                  </div>
                                </div>
                                    <h3>Chest Exercises</h3>
                                    <hr/>
                                    <div key="benchPress">
                                        <label>Bench Press:</label>
                                        <span>{formData.benchPress} mins</span>
                                    </div>
                                    <div key="dumbbellPress">
                                        <label>Dumbbell Press:</label>
                                        <span>{formData.dumbbellPress} mins</span>
                                    </div>
                                    <div key="pushUps">
                                        <label>Push-Ups:</label>
                                        <span>{formData.pushUps} mins</span>
                                    </div>
                                    <div key="chestFlyes">
                                        <label>Chest Flyes:</label>
                                        <span>{formData.chestFlyes} mins</span>
                                    </div>
                                    <div key="inclineBenchPress">
                                        <label>Incline Bench Press:</label>
                                        <span>{formData.inclineBenchPress} mins</span>
                                    </div>
                                    <h3>Back Exercises</h3>
                                    <hr/>
                                    <div key="pullUps">
                                        <label>Pull-Ups:</label>
                                        <span>{formData.pullUps} mins</span>
                                    </div>
                                    <div key="latPulldowns">
                                        <label>Lat Pulldowns:</label>
                                        <span>{formData.latPulldowns} mins</span>
                                    </div>
                                    <div key="bentOverRows">
                                        <label>Bent-Over Rows:</label>
                                        <span>{formData.bentOverRows} mins</span>
                                    </div>
                                    <div key="seatedRows">
                                        <label>Seated Rows:</label>
                                        <span>{formData.seatedRows} mins</span>
                                    </div>
                                    <div key="deadlifts">
                                        <label>Deadlifts:</label>
                                        <span>{formData.deadlifts} mins</span>
                                    </div>
                                    <h3>Sholder Exercises</h3>
                                    <hr/>
                                    <div key="shoulderPress">
                                        <label>Shoulder Press:</label>
                                        <span>{formData.shoulderPress} mins</span>
                                    </div>
                                    <div key="lateralRaises">
                                        <label>Lateral Raises:</label>
                                        <span>{formData.lateralRaises} mins</span>
                                    </div>
                                    <div key="frontRaises">
                                        <label>Front Raises:</label>
                                        <span>{formData.frontRaises} mins</span>
                                    </div>
                                    <div key="rearDeltFlyes">
                                        <label>Rear Delt Flyes:</label>
                                        <span>{formData.rearDeltFlyes} mins</span>
                                    </div>
                                    <div key="uprightRows">
                                        <label>Upright Rows:</label>
                                        <span>{formData.uprightRows} mins</span>
                                    </div>
                                    <h3>Arm Exercises</h3>
                                    <hr/>
                                    <div key="bicepCurls">
                                        <label>Bicep Curls:</label>
                                        <span>{formData.bicepCurls} mins</span>
                                    </div>
                                    <div key="tricepDips">
                                        <label>Tricep Dips:</label>
                                        <span>{formData.tricepDips} mins</span>
                                    </div>
                                    <div key="tricepPushdowns">
                                        <label>Tricep Pushdowns:</label>
                                        <span>{formData.tricepPushdowns} mins</span>
                                    </div>
                                    <div key="hammerCurls">
                                        <label>Hammer Curls:</label>
                                        <span>{formData.hammerCurls} mins</span>
                                    </div>
                                   </div>
                                    <h3>Leg Exercises</h3>
                                    <hr/>
                                    <div key="squats">
                                        <label>Squats:</label>
                                        <span>{formData.squats} mins</span>
                                    </div>
                                    <div key="lunges">
                                        <label>Lunges:</label>
                                        <span>{formData.lunges} mins</span>
                                    </div>
                                    <div key="legPress">
                                        <label>Leg Press:</label>
                                        <span>{formData.legPress} mins</span>
                                    </div>
                                    <div key="legCurls">
                                        <label>Leg Curls:</label>
                                        <span>{formData.legCurls} mins</span>
                                    </div>
                                    <div key="legExtensions">
                                        <label>Leg Extensions:</label>
                                        <span>{formData.legExtensions} mins</span>
                                    </div>
                                    <h3>Core Exercises</h3>
                                    <hr/>
                                  <div key="plank">
                                      <label>Plank:</label>
                                      <span>{formData.plank} mins</span>
                                  </div>
                                  <div key="russianTwists">
                                      <label>Russian Twists:</label>
                                      <span>{formData.russianTwists} mins</span>
                                  </div>
                                  <div key="bicycleCrunches">
                                      <label>Bicycle Crunches:</label>
                                      <span>{formData.bicycleCrunches} mins</span>
                                  </div>
                                  <div key="legRaises">
                                      <label>Leg Raises:</label>
                                      <span>{formData.legRaises} mins</span>
                                  </div>
                                  <div key="mountainClimbers">
                                      <label>Mountain Climbers:</label>
                                      <span>{formData.mountainClimbers} mins</span>
                                  </div>
                                <div>
                                <h3>Cardio Exercises</h3>
                                <hr/>
                                  <div key="treadmill">
                                      <label>Treadmill:</label>
                                      <span>{formData.treadmill} mins</span>
                                  </div>
                                  <div key="cycling">
                                      <label>Cycling:</label>
                                      <span>{formData.cycling} mins</span>
                                  </div>
                                  <div key="elliptical">
                                      <label>Elliptical:</label>
                                      <span>{formData.elliptical} mins</span>
                                  </div>
                                  <div key="jumpRope">
                                      <label>Jump Rope:</label>
                                      <span>{formData.jumpRope} mins</span>
                                  </div>
                                  <div key="rowing">
                                      <label>Rowing:</label>
                                      <span>{formData.rowing} mins</span>
                                  </div>
                                </div>
                                <div>
                                    <h3>Flexibility Exercises</h3>
                                    <hr/>
                                    <div key="yoga">
                                        <label>Yoga:</label>
                                        <span>{formData.yoga} mins</span>
                                    </div>
                                    <div key="dynamicStretches">
                                        <label>Dynamic Stretches:</label>
                                        <span>{formData.dynamicStretches} mins</span>
                                    </div>
                                    <div key="staticStretches">
                                        <label>Static Stretches:</label>
                                        <span>{formData.staticStretches} mins</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RightBar;
