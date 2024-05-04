package com.example.demo.service;

import com.example.demo.dto.ExerciseDurationDTO;
import com.example.demo.entity.ExerciseDurationEntity;
import com.example.demo.repository.ExerciseDurationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class ExerciseDurationService {

    @Autowired
    private ExerciseDurationRepository exerciseDurationRepository;

    @Autowired
    private UserService userService;

    private ModelMapper modelMapper = new ModelMapper();

    public void deleteExerciseReport(int id) {
        exerciseDurationRepository.deleteById(id);
    }

    private String encodeToString(Blob image) {
        try {
            byte[] imgBytes = image.getBytes(1, (int) image.length());
            return Base64.getEncoder().encodeToString(imgBytes);
        } catch (Exception e) {
            return null;
        }
    }

    public List<ExerciseDurationDTO> allWorkoutStatusses() {
        List<ExerciseDurationEntity> exerciseDurationEntities =  exerciseDurationRepository.findAll();
        int length = exerciseDurationEntities.size();
        List<ExerciseDurationDTO> exerciseDurationDTOS = new ArrayList<>(length);
        for (ExerciseDurationEntity exerciseDurationEntity : exerciseDurationEntities) {
            ExerciseDurationDTO exerciseDurationDTO = new ExerciseDurationDTO();
            exerciseDurationDTO = modelMapper.map(exerciseDurationEntity, ExerciseDurationDTO.class);

            String userName = exerciseDurationEntity.getUserName();
            String profilePicture = userService.getProfilePhoto(userName);
            exerciseDurationDTO.setProfilePicture(profilePicture);
            exerciseDurationDTOS.add(exerciseDurationDTO);
        }
        return exerciseDurationDTOS;
    }

    public void saveExerciseDurationReport(ExerciseDurationEntity exerciseDurationEntity) {
        exerciseDurationRepository.save(exerciseDurationEntity);
    }

    public void deleteExerciseDurationEntityById(int id) {
        exerciseDurationRepository.deleteById(id);
    }

    public ExerciseDurationDTO findByUserNameAndDate(String userName) {
        List<ExerciseDurationEntity> exerciseDurationEntities = exerciseDurationRepository.findByUserName(userName);
        ExerciseDurationDTO exerciseDurationDTO = new ExerciseDurationDTO();

        exerciseDurationDTO = modelMapper.map(exerciseDurationEntities.get(exerciseDurationEntities.size()-1), ExerciseDurationDTO.class);

        String profilePicture = userService.getProfilePhoto(userName);
        exerciseDurationDTO.setProfilePicture(profilePicture);
        return exerciseDurationDTO;
    }
    // Method to update the calories of an ExerciseDurationEntity
    public void updateCalories(int id, String newCalories) {
        Optional<ExerciseDurationEntity> optionalEntity = exerciseDurationRepository.findById(id);
        if (optionalEntity.isPresent()) {
            ExerciseDurationEntity entity = optionalEntity.get();
            entity.setCalories(newCalories);
            exerciseDurationRepository.save(entity);
        }
    }

    // Method to update the start time of an ExerciseDurationEntity
    public void updateStartTime(int id, String newStartTime) {
        Optional<ExerciseDurationEntity> optionalEntity = exerciseDurationRepository.findById(id);
        if (optionalEntity.isPresent()) {
            ExerciseDurationEntity entity = optionalEntity.get();
            entity.setStartTime(newStartTime);
            exerciseDurationRepository.save(entity);
        }
    }

    // Method to update the end time of an ExerciseDurationEntity
    public void updateEndTime(int id, String newEndTime) {
        Optional<ExerciseDurationEntity> optionalEntity = exerciseDurationRepository.findById(id);
        if (optionalEntity.isPresent()) {
            ExerciseDurationEntity entity = optionalEntity.get();
            entity.setEndTime(newEndTime);
            exerciseDurationRepository.save(entity);
        }
    }

    // Method to update the duration of an exercise in a specific category
    public void updateExerciseDuration(int id, String exercise, String newDuration) {
        Optional<ExerciseDurationEntity> optionalEntity = exerciseDurationRepository.findById(id);
        if (optionalEntity.isPresent()) {
            ExerciseDurationEntity entity = optionalEntity.get();

            // Use a switch statement to update the exercise duration based on the exercise type
            switch (exercise.toLowerCase()) {
                case "bench-press":
                    entity.setBenchPress(newDuration);
                    break;
                case "dumbbell-press":
                    entity.setDumbbellPress(newDuration);
                    break;
                case "push-ups":
                    entity.setPushUps(newDuration);
                    break;
                case "chest-flyes":
                    entity.setChestFlyes(newDuration);
                    break;
                case "incline-bench-press":
                    entity.setInclineBenchPress(newDuration);
                    break;
                case "pull-ups":
                    entity.setPullUps(newDuration);
                    break;
                case "lat-pulldowns":
                    entity.setLatPulldowns(newDuration);
                    break;
                case "bent-over-rows":
                    entity.setBentOverRows(newDuration);
                    break;
                case "seated-rows":
                    entity.setSeatedRows(newDuration);
                    break;
                case "deadlifts":
                    entity.setDeadlifts(newDuration);
                    break;
                case "shoulder-press":
                    entity.setShoulderPress(newDuration);
                    break;
                case "lateral-raises":
                    entity.setLateralRaises(newDuration);
                    break;
                case "front-raises":
                    entity.setFrontRaises(newDuration);
                    break;
                case "rear-delt-flyes":
                    entity.setRearDeltFlyes(newDuration);
                    break;
                case "upright-rows":
                    entity.setUprightRows(newDuration);
                    break;
                case "bicep-curls":
                    entity.setBicepCurls(newDuration);
                    break;
                case "tricep-dips":
                    entity.setTricepDips(newDuration);
                    break;
                case "tricep-pushdowns":
                    entity.setTricepPushdowns(newDuration);
                    break;
                case "hammer-curls":
                    entity.setHammerCurls(newDuration);
                    break;
                case "squats":
                    entity.setSquats(newDuration);
                    break;
                case "lunges":
                    entity.setLunges(newDuration);
                    break;
                case "leg-press":
                    entity.setLegPress(newDuration);
                    break;
                case "leg-curls":
                    entity.setLegCurls(newDuration);
                    break;
                case "leg-extensions":
                    entity.setLegExtensions(newDuration);
                    break;
                case "plank":
                    entity.setPlank(newDuration);
                    break;
                case "russian-twists":
                    entity.setRussianTwists(newDuration);
                    break;
                case "bicycle-crunches":
                    entity.setBicycleCrunches(newDuration);
                    break;
                case "leg-raises":
                    entity.setLegRaises(newDuration);
                    break;
                case "mountain-climbers":
                    entity.setMountainClimbers(newDuration);
                    break;
                case "treadmill":
                    entity.setTreadmill(newDuration);
                    break;
                case "elliptical":
                    entity.setElliptical(newDuration);
                    break;
                case "cycling":
                    entity.setCycling(newDuration);
                    break;
                case "jump-rope":
                    entity.setJumpRope(newDuration);
                    break;
                case "rowing":
                    entity.setRowing(newDuration);
                    break;
                case "yoga":
                    entity.setYoga(newDuration);
                    break;
                case "dynamic-stretches":
                    entity.setDynamicStretches(newDuration);
                    break;
                case "static-stretches":
                    entity.setStaticStretches(newDuration);
                    break;
            }

            // Save the updated entity
            exerciseDurationRepository.save(entity);
        } else {
            throw new IllegalArgumentException("Invalid ID: " + id);
        }
    }

}
