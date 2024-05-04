import React, { useState } from "react";
import axios from "axios";
import "./WorkoutShare.scss";

const WorkoutShare = ({ userName, profilePic }) => {
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [calories, setCalories] = useState("");

    // State variables for exercise durations
    const [benchPress, setBenchPress] = useState("");
    const [dumbbellPress, setDumbbellPress] = useState("");
    const [pushUps, setPushUps] = useState("");
    const [chestFlyes, setChestFlyes] = useState("");
    const [inclineBenchPress, setInclineBenchPress] = useState("");
    const [pullUps, setPullUps] = useState("");
    const [latPulldowns, setLatPulldowns] = useState("");
    const [bentOverRows, setBentOverRows] = useState("");
    const [seatedRows, setSeatedRows] = useState("");
    const [deadlifts, setDeadlifts] = useState("");
    const [shoulderPress, setShoulderPress] = useState("");
    const [lateralRaises, setLateralRaises] = useState("");
    const [frontRaises, setFrontRaises] = useState("");
    const [rearDeltFlyes, setRearDeltFlyes] = useState("");
    const [uprightRows, setUprightRows] = useState("");
    const [bicepCurls, setBicepCurls] = useState("");
    const [tricepDips, setTricepDips] = useState("");
    const [tricepPushdowns, setTricepPushdowns] = useState("");
    const [hammerCurls, setHammerCurls] = useState("");
    const [squats, setSquats] = useState("");
    const [lunges, setLunges] = useState("");
    const [legPress, setLegPress] = useState("");
    const [legCurls, setLegCurls] = useState("");
    const [legExtensions, setLegExtensions] = useState("");
    const [plank, setPlank] = useState("");
    const [russianTwists, setRussianTwists] = useState("");
    const [bicycleCrunches, setBicycleCrunches] = useState("");
    const [legRaises, setLegRaises] = useState("");
    const [mountainClimbers, setMountainClimbers] = useState("");
    const [treadmill, setTreadmill] = useState("");
    const [elliptical, setElliptical] = useState("");
    const [cycling, setCycling] = useState("");
    const [jumpRope, setJumpRope] = useState("");
    const [rowing, setRowing] = useState("");
    const [yoga, setYoga] = useState("");
    const [dynamicStretches, setDynamicStretches] = useState("");
    const [staticStretches, setStaticStretches] = useState("");

    const handlePostWorkoutReport = async () => {
      try {
          const formData = new FormData();
          formData.append("userName", userName);
          formData.append("date", date);
          formData.append("startTime", startTime);
          formData.append("endTime", endTime);
          formData.append("calories", calories);
          formData.append("benchPress", benchPress);
          formData.append("dumbbellPress", dumbbellPress);
          formData.append("pushUps", pushUps);
          formData.append("chestFlyes", chestFlyes);
          formData.append("inclineBenchPress", inclineBenchPress);
          formData.append("pullUps", pullUps);
          formData.append("latPulldowns", latPulldowns);
          formData.append("bentOverRows", bentOverRows);
          formData.append("seatedRows", seatedRows);
          formData.append("deadlifts", deadlifts);
          formData.append("shoulderPress", shoulderPress);
          formData.append("lateralRaises", lateralRaises);
          formData.append("frontRaises", frontRaises);
          formData.append("rearDeltFlyes", rearDeltFlyes);
          formData.append("uprightRows", uprightRows);
          formData.append("bicepCurls", bicepCurls);
          formData.append("tricepDips", tricepDips);
          formData.append("tricepPushdowns", tricepPushdowns);
          formData.append("hammerCurls", hammerCurls);
          formData.append("squats", squats);
          formData.append("lunges", lunges);
          formData.append("legPress", legPress);
          formData.append("legCurls", legCurls);
          formData.append("legExtensions", legExtensions);
          formData.append("plank", plank);
          formData.append("russianTwists", russianTwists);
          formData.append("bicycleCrunches", bicycleCrunches);
          formData.append("legRaises", legRaises);
          formData.append("mountainClimbers", mountainClimbers);
          formData.append("treadmill", treadmill);
          formData.append("elliptical", elliptical);
          formData.append("cycling", cycling);
          formData.append("jumpRope", jumpRope);
          formData.append("rowing", rowing);
          formData.append("yoga", yoga);
          formData.append("dynamicStretches", dynamicStretches);
          formData.append("staticStretches", staticStretches);
  
          const response = await axios.post("http://localhost:8080/api/exercise-duration/upload", formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          });
  
          console.log(response.data);
          alert("Workout report shared successfully!");
      } catch (error) {
          console.error("Error sharing workout report:", error);
          alert("Failed to share workout report. Please try again.");
      }
  };

    return (
        <div className="workout-share">
            <div className="container">
                <div className="top">
                    <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />
                    <span className="name">{userName}</span>
                </div>
                <div className="main-details">
                  {/* Date input */}
                  <div className="input-container">
                      <label>Select Date:</label>
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>

                  {/* Start time input */}
                  <div className="input-container">
                      <label>Time go into the Gym:</label>
                      <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                  </div>

                  {/* End time input */}
                  <div className="input-container">
                      <label>Time exit form the Gym:</label>
                      <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                  </div>

                  {/* Calories input */}
                  <div className="input-container">
                      <label>Calories burned:</label>
                      <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />
                  </div>
                </div>
                <div className="ranges">
                    <h3>Chest Exercises</h3>
                    <div>
                        <label>Bench Press:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={benchPress}
                            onChange={(e) => setBenchPress(e.target.value)}
                        />
                        <span>{benchPress} mins</span>
                    </div>
                    <div>
                        <label>Dumbbell Press:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={dumbbellPress}
                            onChange={(e) => setDumbbellPress(e.target.value)}
                        />
                        <span>{dumbbellPress} mins</span>
                    </div>
                    <div>
                        <label>Push-Ups:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={pushUps}
                            onChange={(e) => setPushUps(e.target.value)}
                        />
                        <span>{pushUps} mins</span>
                    </div>
                    <div>
                        <label>Chest Flyes:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={chestFlyes}
                            onChange={(e) => setChestFlyes(e.target.value)}
                        />
                        <span>{chestFlyes} mins</span>
                    </div>
                    <div>
                        <label>Incline Bench Press:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={inclineBenchPress}
                            onChange={(e) => setInclineBenchPress(e.target.value)}
                        />
                        <span>{inclineBenchPress} mins</span>
                    </div>
                    <h3>Back Exercises</h3> 
                    <div>
                        <label>Pull-Ups:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={pullUps}
                            onChange={(e) => setPullUps(e.target.value)}
                        />
                        <span>{pullUps} mins</span>
                    </div>
                    <div>
                        <label>Lat Pulldowns:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={latPulldowns}
                            onChange={(e) => setLatPulldowns(e.target.value)}
                        />
                        <span>{latPulldowns} mins</span>
                    </div>
                    <div>
                        <label>Bent-Over Rows:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={bentOverRows}
                            onChange={(e) => setBentOverRows(e.target.value)}
                        />
                        <span>{bentOverRows} mins</span>
                    </div>
                    <div>
                        <label>Seated Rows:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={seatedRows}
                            onChange={(e) => setSeatedRows(e.target.value)}
                        />
                        <span>{seatedRows} mins</span>
                    </div>
                    <div>
                        <label>Deadlifts:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={deadlifts}
                            onChange={(e) => setDeadlifts(e.target.value)}
                        />
                        <span>{deadlifts} mins</span>
                    </div>
                    <h3>Sholder Exercises</h3> 
                    <div>
                        <label>Shoulder Press:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={shoulderPress}
                            onChange={(e) => setShoulderPress(e.target.value)}
                        />
                        <span>{shoulderPress} mins</span>
                    </div>
                    <div>
                        <label>Lateral Raises:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={lateralRaises}
                            onChange={(e) => setLateralRaises(e.target.value)}
                        />
                        <span>{lateralRaises} mins</span>
                    </div>
                    <div>
                        <label>Front Raises:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={frontRaises}
                            onChange={(e) => setFrontRaises(e.target.value)}
                        />
                        <span>{frontRaises} mins</span>
                    </div>
                    <div>
                        <label>Rear Delt Flyes:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={rearDeltFlyes}
                            onChange={(e) => setRearDeltFlyes(e.target.value)}
                        />
                        <span>{rearDeltFlyes} mins</span>
                    </div>
                    <div>
                        <label>Upright Rows:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={uprightRows}
                            onChange={(e) => setUprightRows(e.target.value)}
                        />
                        <span>{uprightRows} mins</span>
                    </div>
                    <h3>Arms Exercises</h3> 
                    <div>
                        <label>Bicep Curls:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={bicepCurls}
                            onChange={(e) => setBicepCurls(e.target.value)}
                        />
                        <span>{bicepCurls} mins</span>
                    </div>
                    <div>
                        <label>Tricep Dips:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={tricepDips}
                            onChange={(e) => setTricepDips(e.target.value)}
                        />
                        <span>{tricepDips} mins</span>
                    </div>
                    <div>
                        <label>Tricep Pushdowns:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={tricepPushdowns}
                            onChange={(e) => setTricepPushdowns(e.target.value)}
                        />
                        <span>{tricepPushdowns} mins</span>
                    </div>
                    <div>
                        <label>Hammer Curls:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={hammerCurls}
                            onChange={(e) => setHammerCurls(e.target.value)}
                        />
                        <span>{hammerCurls} mins</span>
                    </div>
                    <h3>Leg Exercises</h3> 
                    <div>
                        <label>Squats:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={squats}
                            onChange={(e) => setSquats(e.target.value)}
                        />
                        <span>{squats} mins</span>
                    </div>
                    <div>
                        <label>Lunges:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={lunges}
                            onChange={(e) => setLunges(e.target.value)}
                        />
                        <span>{lunges} mins</span>
                    </div>
                    <div>
                        <label>Leg Press:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={legPress}
                            onChange={(e) => setLegPress(e.target.value)}
                        />
                        <span>{legPress} mins</span>
                    </div>
                    <div>
                        <label>Leg Curls:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={legCurls}
                            onChange={(e) => setLegCurls(e.target.value)}
                        />
                        <span>{legCurls} mins</span>
                    </div>
                    <div>
                        <label>Leg Extensions:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={legExtensions}
                            onChange={(e) => setLegExtensions(e.target.value)}
                        />
                        <span>{legExtensions} mins</span>
                    </div>
                    <h3>Core Exercises</h3>
                    <div>
                        <label>Plank:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={plank}
                            onChange={(e) => setPlank(e.target.value)}
                        />
                        <span>{plank} mins</span>
                    </div>
                    <div>
                        <label>Russian Twists:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={russianTwists}
                            onChange={(e) => setRussianTwists(e.target.value)}
                        />
                        <span>{russianTwists} mins</span>
                    </div>
                    <div>
                        <label>Bicycle Crunches:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={bicycleCrunches}
                            onChange={(e) => setBicycleCrunches(e.target.value)}
                        />
                        <span>{bicycleCrunches} mins</span>
                    </div>
                    <div>
                        <label>Leg Raises:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={legRaises}
                            onChange={(e) => setLegRaises(e.target.value)}
                        />
                        <span>{legRaises} mins</span>
                    </div>
                    <div>
                        <label>Mountain Climbers:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={mountainClimbers}
                            onChange={(e) => setMountainClimbers(e.target.value)}
                        />
                        <span>{mountainClimbers} mins</span>
                    </div>

                    <h3>Cardio Exercises</h3>
                    <div>
                        <label>Treadmill:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={treadmill}
                            onChange={(e) => setTreadmill(e.target.value)}
                        />
                        <span>{treadmill} mins</span>
                    </div>
                    <div>
                        <label>Elliptical:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={elliptical}
                            onChange={(e) => setElliptical(e.target.value)}
                        />
                        <span>{elliptical} mins</span>
                    </div>
                    <div>
                        <label>Cycling:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={cycling}
                            onChange={(e) => setCycling(e.target.value)}
                        />
                        <span>{cycling} mins</span>
                    </div>
                    <div>
                        <label>Jump Rope:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={jumpRope}
                            onChange={(e) => setJumpRope(e.target.value)}
                        />
                        <span>{jumpRope} mins</span>
                    </div>
                    <div>
                        <label>Rowing:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={rowing}
                            onChange={(e) => setRowing(e.target.value)}
                        />
                        <span>{rowing} mins</span>
                    </div>
                    <h3>Flexibility Exeercises</h3>
                    <div>
                        <label>Yoga:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={yoga}
                            onChange={(e) => setYoga(e.target.value)}
                        />
                        <span>{yoga} mins</span>
                    </div>
                    <div>
                        <label>Dynamic Stretches:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={dynamicStretches}
                            onChange={(e) => setDynamicStretches(e.target.value)}
                        />
                        <span>{dynamicStretches} mins</span>
                    </div>
                    <div>
                        <label>Static Stretches:</label>
                        <input
                            type="range"
                            min="0"
                            max="60"
                            value={staticStretches}
                            onChange={(e) => setStaticStretches(e.target.value)}
                        />
                        <span>{staticStretches} mins</span>
                    </div>

                </div>
                <hr/>
                <div className="bottom">
                    <button onClick={handlePostWorkoutReport}>Share</button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutShare;
