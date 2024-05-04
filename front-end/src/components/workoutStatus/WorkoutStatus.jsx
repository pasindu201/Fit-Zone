import "./WorkoutStatus.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const WorkoutStatus = ({ workoutReport, userName }) => {
    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Function to delete the workout report
    const deleteReport = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/exercise-duration/delete/${id}`);
            alert("Workout report deleted successfully!");
        } catch (error) {
            console.error('Error deleting report:', error);
            alert('Failed to delete report. Please try again.');
        }
    };
    
    // Handle deleting the workout report
    const handleDeleteReport = () => {
        deleteReport(workoutReport.id);
        setMenuOpen(false);
    };
    // update start time
    const updateStartTime = async (id, newValue) => {
        try {
            const response = await axios.patch(
                `http://localhost:8080/api/exercise-duration/startTime/${workoutReport.id}/${newValue}`
            );
            alert("Start time updated successfully!");
            return response.data;
        } catch (error) {
            console.error('Error updating :', error);
            alert('Failed to update . Please try again.');
        }
    };

    const handleUpdateSrartTime = () => {
        const newStartTime = prompt("Enter a new start time:");
        if (newStartTime !== null && newStartTime.trim() !== "") {
            updateStartTime(workoutReport.id, newStartTime);
            setMenuOpen(false);
        }
    };

    // update end time
    const updateEndTime = async (id, newValue) => {
        try {
            const response = await axios.patch(
                `http://localhost:8080/api/exercise-duration/end-time/${workoutReport.id}/${newValue}`
            );
            alert("Start time updated successfully!");
            return response.data;
        } catch (error) {
            console.error('Error updating :', error);
            alert('Failed to update . Please try again.');
        }
    };

    const handleUpdateEndTime = () => {
        const newEndTime = prompt("Enter a new start time:");
        if (newEndTime !== null && newEndTime.trim() !== "") {
            updateEndTime(workoutReport.id, newEndTime);
            setMenuOpen(false);
        }
    };

    // update calories
    const updateCalories = async (id, newValue) => {
        try {
            const response = await axios.patch(
                `http://localhost:8080/api/exercise-duration/calories/${workoutReport.id}/${newValue}`
            );
            alert("Start time updated successfully!");
            return response.data;
        } catch (error) {
            console.error('Error updating :', error);
            alert('Failed to update . Please try again.');
        }
    };

    const handleCalories = () => {
        const newCalories = prompt("Enter a new value for number of calories burned:");
        if (newCalories !== null && newCalories.trim() !== "") {
            updateCalories(workoutReport.id, newCalories);
            setMenuOpen(false);
        }
    };

    // Function to prompt the user for a new duration and update the exercise duration in a specific category
    const promptAndUpdate = async (exercise) => {
        // Prompt the user for a new duration value
        const newValue = prompt(`Enter the new duration value for ${exercise}:`);
        
        // If the user provided a value and it's not empty
        if (newValue !== null && newValue.trim() !== "") {
            try {
                // Send a PATCH request to the specified endpoint with the parameters
                await axios.patch(`http://localhost:8080/api/exercise-duration/update-duration/${workoutReport.id}/${exercise}/${newValue}`);
                alert(`${exercise} updated successfully!`);
            } catch (error) {
                console.error(`Error updating ${exercise}:`, error);
                alert(`Failed to update ${exercise}. Please try again.`);
            }
        }
    };

    return (
            <div className="status">
              <div className="container">
                <div className="user">
                  <div className="userInfo">
                    <img src={`data:image/jpeg;base64,${workoutReport.profilePicture}`} alt="Profile" />
                    <div className="details">
                      <Link
                        to={`/profile/${workoutReport.userName}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <span className="name">{workoutReport.userName}</span>
                      </Link>
                      <span className="date">Date: {workoutReport.date}</span>
                    </div>
                  </div>
                  {workoutReport.userName === userName && (
                <div className="menu">
                    <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
                    {menuOpen && (
                        <div className="dropdown-menu">
                            <button onClick={handleDeleteReport}>Delete Workout Report</button>
                            <button onClick={handleCalories}>Update Calories</button>
                            <button onClick={handleUpdateSrartTime}>Update Start Time</button>
                            <button onClick={handleUpdateEndTime}>Update End Time</button>
                            <button onClick={() => promptAndUpdate('bench-press')}>Update Bench Press</button>
                            <button onClick={() => promptAndUpdate('dumbbell-press')}>Update Dumbbell Press</button>
                            <button onClick={() => promptAndUpdate('push-ups')}>Update Push-Ups</button>
                            <button onClick={() => promptAndUpdate('chest-flyes')}>Update Chest Flyes</button>
                            <button onClick={() => promptAndUpdate('incline-bench-press')}>Update Incline Bench Press</button>
                            <button onClick={() => promptAndUpdate('pull-ups')}>Update Pull-Ups</button>
                            <button onClick={() => promptAndUpdate('lat-pulldowns')}>Update Lat Pulldowns</button>
                            <button onClick={() => promptAndUpdate('bent-over-rows')}>Update Bent-Over Rows</button>
                            <button onClick={() => promptAndUpdate('seated-rows')}>Update Seated Rows</button>
                            <button onClick={() => promptAndUpdate('deadlifts')}>Update Deadlifts</button>
                            <button onClick={() => promptAndUpdate('shoulder-press')}>Update Shoulder Press</button>
                            <button onClick={() => promptAndUpdate('lateral-raises')}>Update Lateral Raises</button>
                            <button onClick={() => promptAndUpdate('front-raises')}>Update Front Raises</button>
                            <button onClick={() => promptAndUpdate('rear-delt-flyes')}>Update Rear Delt Flyes</button>
                            <button onClick={() => promptAndUpdate('upright-rows')}>Update Upright Rows</button>
                            <button onClick={() => promptAndUpdate('bicep-curls')}>Update Bicep Curls</button>
                            <button onClick={() => promptAndUpdate('tricep-dips')}>Update Tricep Dips</button>
                            <button onClick={() => promptAndUpdate('tricep-pushdowns')}>Update Tricep Pushdowns</button>
                            <button onClick={() => promptAndUpdate('hammer-curls')}>Update Hammer Curls</button>
                            <button onClick={() => promptAndUpdate('squats')}>Update Squats</button>
                            <button onClick={() => promptAndUpdate('lunges')}>Update Lunges</button>
                            <button onClick={() => promptAndUpdate('leg-press')}>Update Leg Press</button>
                            <button onClick={() => promptAndUpdate('leg-curls')}>Update Leg Curls</button>
                            <button onClick={() => promptAndUpdate('leg-extensions')}>Update Leg Extensions</button>
                            <button onClick={() => promptAndUpdate('plank')}>Update Plank</button>
                            <button onClick={() => promptAndUpdate('russian-twists')}>Update Russian Twists</button>
                            <button onClick={() => promptAndUpdate('bicycle-crunches')}>Update Bicycle Crunches</button>
                            <button onClick={() => promptAndUpdate('leg-raises')}>Update Leg Raises</button>
                            <button onClick={() => promptAndUpdate('mountain-climbers')}>Update Mountain Climbers</button>
                            <button onClick={() => promptAndUpdate('treadmill')}>Update Treadmill</button>
                            <button onClick={() => promptAndUpdate('elliptical')}>Update Elliptical</button>
                            <button onClick={() => promptAndUpdate('cycling')}>Update Cycling</button>
                            <button onClick={() => promptAndUpdate('jump-rope')}>Update Jump Rope</button>
                            <button onClick={() => promptAndUpdate('rowing')}>Update Rowing</button>
                            <button onClick={() => promptAndUpdate('yoga')}>Update Yoga</button>
                            <button onClick={() => promptAndUpdate('dynamic-stretches')}>Update Dynamic Stretches</button>
                            <button onClick={() => promptAndUpdate('static-stretches')}>Update Static Stretches</button>
                        </div>
                    )}
                </div>
            )} 
                </div>
                <div className="content">
                    <div className="special">
                      <div key="benchPress">
                        <label>Time enter into the Gym : </label>
                        <span>{workoutReport.startTime} </span>
                      </div>
                      <div key="benchPress">
                        <label>Time exit from the Gym : </label>
                        <span>{workoutReport.endTime} </span>
                      </div>
                      <div key="benchPress">
                        <label>Calories burned : </label>
                        <span>{workoutReport.calories} calories</span>
                      </div>
                    </div>
                <div className="exercises">
                <h3>Chest Exercises</h3>
                <hr/>
                <div key="benchPress">
                    <label>Bench Press:</label>
                    <span>{workoutReport.benchPress} mins</span>
                </div>
                <div key="dumbbellPress">
                    <label>Dumbbell Press:</label>
                    <span>{workoutReport.dumbbellPress} mins</span>
                </div>
                <div key="pushUps">
                    <label>Push-Ups:</label>
                    <span>{workoutReport.pushUps} mins</span>
                </div>
                <div key="chestFlyes">
                    <label>Chest Flyes:</label>
                    <span>{workoutReport.chestFlyes} mins</span>
                </div>
                <div key="inclineBenchPress">
                    <label>Incline Bench Press:</label>
                    <span>{workoutReport.inclineBenchPress} mins</span>
                </div>

                <h3>Back Exercises</h3>
                <hr/>
                <div key="pullUps">
                    <label>Pull-Ups:</label>
                    <span>{workoutReport.pullUps} mins</span>
                </div>
                <div key="latPulldowns">
                    <label>Lat Pulldowns:</label>
                    <span>{workoutReport.latPulldowns} mins</span>
                </div>
                <div key="bentOverRows">
                    <label>Bent-Over Rows:</label>
                    <span>{workoutReport.bentOverRows} mins</span>
                </div>
                <div key="seatedRows">
                    <label>Seated Rows:</label>
                    <span>{workoutReport.seatedRows} mins</span>
                </div>
                <div key="deadlifts">
                    <label>Deadlifts:</label>
                    <span>{workoutReport.deadlifts} mins</span>
                </div>

                <h3>Sholder Exercises</h3>
                <hr/>
                <div key="shoulderPress">
                    <label>Shoulder Press:</label>
                    <span>{workoutReport.shoulderPress} mins</span>
                </div>
                <div key="lateralRaises">
                    <label>Lateral Raises:</label>
                    <span>{workoutReport.lateralRaises} mins</span>
                </div>
                <div key="frontRaises">
                    <label>Front Raises:</label>
                    <span>{workoutReport.frontRaises} mins</span>
                </div>
                <div key="rearDeltFlyes">
                    <label>Rear Delt Flyes:</label>
                    <span>{workoutReport.rearDeltFlyes} mins</span>
                </div>
                <div key="uprightRows">
                    <label>Upright Rows:</label>
                    <span>{workoutReport.uprightRows} mins</span>
                </div>

                <h3>Arm Exercises</h3>
                <hr/>
                <div key="bicepCurls">
                    <label>Bicep Curls:</label>
                    <span>{workoutReport.bicepCurls} mins</span>
                </div>
                <div key="tricepDips">
                    <label>Tricep Dips:</label>
                    <span>{workoutReport.tricepDips} mins</span>
                </div>
                <div key="tricepPushdowns">
                    <label>Tricep Pushdowns:</label>
                    <span>{workoutReport.tricepPushdowns} mins</span>
                </div>
                <div key="hammerCurls">
                    <label>Hammer Curls:</label>
                    <span>{workoutReport.hammerCurls} mins</span>
                </div>

                <h3>Leg Exercises</h3>
                <hr/>
                <div key="squats">
                    <label>Squats:</label>
                    <span>{workoutReport.squats} mins</span>
                </div>
                <div key="lunges">
                    <label>Lunges:</label>
                    <span>{workoutReport.lunges} mins</span>
                </div>
                <div key="legPress">
                    <label>Leg Press:</label>
                    <span>{workoutReport.legPress} mins</span>
                </div>
                <div key="legCurls">
                    <label>Leg Curls:</label>
                    <span>{workoutReport.legCurls} mins</span>
                </div>
                <div key="legExtensions">
                    <label>Leg Extensions:</label>
                    <span>{workoutReport.legExtensions} mins</span>
                </div>

                <h3>Core Exercises</h3>
                <hr/>
                <div key="plank">
                    <label>Plank:</label>
                    <span>{workoutReport.plank} mins</span>
                </div>
                <div key="russianTwists">
                    <label>Russian Twists:</label>
                    <span>{workoutReport.russianTwists} mins</span>
                </div>
                <div key="bicycleCrunches">
                    <label>Bicycle Crunches:</label>
                    <span>{workoutReport.bicycleCrunches} mins</span>
                </div>
                <div key="legRaises">
                    <label>Leg Raises:</label>
                    <span>{workoutReport.legRaises} mins</span>
                </div>
                <div key="mountainClimbers">
                    <label>Mountain Climbers:</label>
                    <span>{workoutReport.mountainClimbers} mins</span>
                </div>
            
                <h3>Cardio Exercises</h3>
                <hr/>
                <div key="treadmill">
                    <label>Treadmill:</label>
                    <span>{workoutReport.treadmill} mins</span>
                </div>
                <div key="cycling">
                    <label>Cycling:</label>
                    <span>{workoutReport.cycling} mins</span>
                </div>
                <div key="elliptical">
                    <label>Elliptical:</label>
                    <span>{workoutReport.elliptical} mins</span>
                </div>
                <div key="jumpRope">
                    <label>Jump Rope:</label>
                    <span>{workoutReport.jumpRope} mins</span>
                </div>
                <div key="rowing">
                    <label>Rowing:</label>
                    <span>{workoutReport.rowing} mins</span>
                </div>
        
                <h3>Flexibility Exercises</h3>
                <hr/>
                <div key="yoga">
                    <label>Yoga:</label>
                    <span>{workoutReport.yoga} mins</span>
                </div>
                <div key="dynamicStretches">
                    <label>Dynamic Stretches:</label>
                    <span>{workoutReport.dynamicStretches} mins</span>
                </div>
                <div key="staticStretches">
                    <label>Static Stretches:</label>
                    <span>{workoutReport.staticStretches} mins</span>
                </div>
                </div>
                </div>
              </div>
            </div>
          );
        };
        
export default WorkoutStatus;
