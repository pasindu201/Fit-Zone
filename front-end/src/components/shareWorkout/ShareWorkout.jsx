import React, { useState } from "react";
import axios from "axios";
import "./ShareWorkout.scss";
import Image from "../../assets/img.png";

const ShareWorkout = ({ userName, profilePic }) => {
    const [exercises, setExercises] = useState([]);
    const [workoutPlanName, setWorkoutPlanName] = useState("");
    const [description, setDescription] = useState("");

    const addExercise = () => {
        setExercises(prevExercises => [
            ...prevExercises,
            {
                exerciseName: "",
                exerciseDescription: "",
                exerciseImage: null, // Initialize the image as null
                exercisePreviewImage: null // Initialize the preview image as null
            }
        ]);
    };

    const handleExerciseChange = (index, event) => {
        const { name, value } = event.target;
        setExercises(prevExercises => {
            const updatedExercises = [...prevExercises];
            updatedExercises[index][name] = value;
            return updatedExercises;
        });
    };

    const handleImageChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file); // Create a URL for the selected image
            setExercises(prevExercises => {
                const updatedExercises = [...prevExercises];
                updatedExercises[index].exerciseImage = file;
                updatedExercises[index].exercisePreviewImage = imageURL; // Set the preview image URL
                return updatedExercises;
            });
        }
    };

    const uploadWorkout = async () => {
        // Upload the workout plan description
        const descriptionFormData = new FormData();
        descriptionFormData.append("workoutPlan", workoutPlanName);
        descriptionFormData.append("description", description);
        descriptionFormData.append("userName", userName);
        
        try {
            // Upload the workout plan description
            const descriptionResponse = await axios.post(
                "http://localhost:8080/api/exercises/saveDescription",
                descriptionFormData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(descriptionResponse.data);
    
            // If description upload is successful, proceed with exercises
            if (descriptionResponse.status === 201) {
                for (const exercise of exercises) {
                    // Create a new FormData object for each exercise
                    const exerciseFormData = new FormData();
                    exerciseFormData.append("workoutName", workoutPlanName);
                    exerciseFormData.append("exerciseName", exercise.exerciseName);
                    exerciseFormData.append("description", exercise.exerciseDescription);
                    
                    // Append the exercise image if available
                    if (exercise.exerciseImage) {
                        exerciseFormData.append("Image", exercise.exerciseImage);
                    }
    
                    // Upload each exercise
                    const exerciseResponse = await axios.post(
                        "http://localhost:8080/api/exercises/saveExercise",
                        exerciseFormData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                    console.log(exerciseResponse.data);
                }
    
                console.log("Workout plan and exercises uploaded successfully.");
                // Handle success response (e.g., notify user or clear form)
            } else {
                console.error("Failed to upload workout description:", descriptionResponse.statusText);
            }
        } catch (error) {
            console.error("Error uploading workout plan or exercises:", error);
            // Handle error response (e.g., notify user)
        }
    };    

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <img src={`data:image/jpeg;base64,${profilePic}`} alt="Profile" />
                    <span className="name">{userName}</span>
                </div>
                <input
                    className="workout-plan-name-input"
                    type="text"
                    placeholder="Enter Name of the Workout Plan"
                    value={workoutPlanName}
                    onChange={(e) => setWorkoutPlanName(e.target.value)}
                />
                <div className="sub-topic">
                    <span>Workout Description</span>
                    <hr />
                </div>
                <textarea
                    className="workout-plan-description"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <hr />
                <div className="exercises">
                    {exercises.map((exercise, index) => (
                        <div className="exercise" key={index}>
                            <div className="sub-topic">
                                <span>Exercise {index + 1}</span>
                                <hr />
                            </div>
                            <div className="exercise-details">
                                <input
                                    type="text"
                                    placeholder="Exercise Name"
                                    name="exerciseName"
                                    value={exercise.exerciseName}
                                    onChange={(e) => handleExerciseChange(index, e)}
                                />
                                <textarea
                                    placeholder="Exercise Description"
                                    name="exerciseDescription"
                                    value={exercise.exerciseDescription}
                                    onChange={(e) => handleExerciseChange(index, e)}
                                />
                                {exercise.exercisePreviewImage && (
                                    <img
                                        src={exercise.exercisePreviewImage}
                                        alt="Exercise Preview"
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "500px",
                                            objectFit: "cover",
                                            marginTop: "20px"
                                        }}
                                    />
                                )}
                                <div className="left">
                                    <input
                                        type="file"
                                        id={`file-${index}`}
                                        style={{ display: "none" }}
                                        onChange={(e) => handleImageChange(index, e)}
                                    />
                                    <label htmlFor={`file-${index}`}>
                                        <div className="item">
                                            <img src={Image} alt="" />
                                            <span>Add Image</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
                <div className="bottom">
                    <button onClick={addExercise}>Add Exercise</button>
                    <button onClick={uploadWorkout}>Upload Workout Plan</button>
                </div>
            </div>
        </div>
    );
};

export default ShareWorkout;
