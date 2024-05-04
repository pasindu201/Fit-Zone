package com.example.demo.controller;

import com.example.demo.dto.ExerciseDurationDTO;
import com.example.demo.entity.ExerciseDurationEntity;
import com.example.demo.service.ExerciseDurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/exercise-duration")
public class ExerciseDurationController {

    @Autowired
    private ExerciseDurationService exerciseDurationService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadExerciseDurationReport(
            @RequestParam("userName") String userName,
            @RequestParam("calories") String calories,
            @RequestParam("date") String date,
            @RequestParam("startTime") String startTime,
            @RequestParam("endTime") String endTime,
            // Chest exercises
            @RequestParam("benchPress") String benchPress,
            @RequestParam("dumbbellPress") String dumbbellPress,
            @RequestParam("pushUps") String pushUps,
            @RequestParam("chestFlyes") String chestFlyes,
            @RequestParam("inclineBenchPress") String inclineBenchPress,
            // Back exercises
            @RequestParam("pullUps") String pullUps,
            @RequestParam("latPulldowns") String latPulldowns,
            @RequestParam("bentOverRows") String bentOverRows,
            @RequestParam("seatedRows") String seatedRows,
            @RequestParam("deadlifts") String deadlifts,
            // Shoulders exercises
            @RequestParam("shoulderPress") String shoulderPress,
            @RequestParam("lateralRaises") String lateralRaises,
            @RequestParam("frontRaises") String frontRaises,
            @RequestParam("rearDeltFlyes") String rearDeltFlyes,
            @RequestParam("uprightRows") String uprightRows,
            // Arms exercises
            @RequestParam("bicepCurls") String bicepCurls,
            @RequestParam("tricepDips") String tricepDips,
            @RequestParam("tricepPushdowns") String tricepPushdowns,
            @RequestParam("hammerCurls") String hammerCurls,
            // Legs exercises
            @RequestParam("squats") String squats,
            @RequestParam("lunges") String lunges,
            @RequestParam("legPress") String legPress,
            @RequestParam("legCurls") String legCurls,
            @RequestParam("legExtensions") String legExtensions,
            // Core exercises
            @RequestParam("plank") String plank,
            @RequestParam("russianTwists") String russianTwists,
            @RequestParam("bicycleCrunches") String bicycleCrunches,
            @RequestParam("legRaises") String legRaises,
            @RequestParam("mountainClimbers") String mountainClimbers,
            // Cardio exercises
            @RequestParam("treadmill") String treadmill,
            @RequestParam("elliptical") String elliptical,
            @RequestParam("cycling") String cycling,
            @RequestParam("jumpRope") String jumpRope,
            @RequestParam("rowing") String rowing,
            // Flexibility exercises
            @RequestParam("yoga") String yoga,
            @RequestParam("dynamicStretches") String dynamicStretches,
            @RequestParam("staticStretches") String staticStretches
    ) {
        try {
            // Create a new ExerciseDurationEntity with the provided parameters
            ExerciseDurationEntity exerciseDurationEntity = new ExerciseDurationEntity();
            exerciseDurationEntity.setUserName(userName);
            exerciseDurationEntity.setCalories(calories);
            exerciseDurationEntity.setDate(date);
            exerciseDurationEntity.setStartTime(startTime);
            exerciseDurationEntity.setEndTime(endTime);

            // Set the durations for all exercises
            exerciseDurationEntity.setBenchPress(benchPress);
            exerciseDurationEntity.setDumbbellPress(dumbbellPress);
            exerciseDurationEntity.setPushUps(pushUps);
            exerciseDurationEntity.setChestFlyes(chestFlyes);
            exerciseDurationEntity.setInclineBenchPress(inclineBenchPress);

            exerciseDurationEntity.setPullUps(pullUps);
            exerciseDurationEntity.setLatPulldowns(latPulldowns);
            exerciseDurationEntity.setBentOverRows(bentOverRows);
            exerciseDurationEntity.setSeatedRows(seatedRows);
            exerciseDurationEntity.setDeadlifts(deadlifts);

            exerciseDurationEntity.setShoulderPress(shoulderPress);
            exerciseDurationEntity.setLateralRaises(lateralRaises);
            exerciseDurationEntity.setFrontRaises(frontRaises);
            exerciseDurationEntity.setRearDeltFlyes(rearDeltFlyes);
            exerciseDurationEntity.setUprightRows(uprightRows);

            exerciseDurationEntity.setBicepCurls(bicepCurls);
            exerciseDurationEntity.setTricepDips(tricepDips);
            exerciseDurationEntity.setTricepPushdowns(tricepPushdowns);
            exerciseDurationEntity.setHammerCurls(hammerCurls);

            exerciseDurationEntity.setSquats(squats);
            exerciseDurationEntity.setLunges(lunges);
            exerciseDurationEntity.setLegPress(legPress);
            exerciseDurationEntity.setLegCurls(legCurls);
            exerciseDurationEntity.setLegExtensions(legExtensions);

            exerciseDurationEntity.setPlank(plank);
            exerciseDurationEntity.setRussianTwists(russianTwists);
            exerciseDurationEntity.setBicycleCrunches(bicycleCrunches);
            exerciseDurationEntity.setLegRaises(legRaises);
            exerciseDurationEntity.setMountainClimbers(mountainClimbers);

            exerciseDurationEntity.setTreadmill(treadmill);
            exerciseDurationEntity.setElliptical(elliptical);
            exerciseDurationEntity.setCycling(cycling);
            exerciseDurationEntity.setJumpRope(jumpRope);
            exerciseDurationEntity.setRowing(rowing);

            exerciseDurationEntity.setYoga(yoga);
            exerciseDurationEntity.setDynamicStretches(dynamicStretches);
            exerciseDurationEntity.setStaticStretches(staticStretches);

            // Save the ExerciseDurationEntity using the service class
            exerciseDurationService.saveExerciseDurationReport(exerciseDurationEntity);

            // Return a successful response
            return ResponseEntity.ok("Successfully uploaded exercise duration report");
        } catch (Exception e) {
            // Return a response indicating an error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload exercise duration report");
        }
    }

    // Endpoint to get all exercise duration reports
    @GetMapping("/all")
    public ResponseEntity<List<ExerciseDurationDTO>> getAllWorkoutStatus() {
        List<ExerciseDurationDTO> exerciseDurationDTOList = exerciseDurationService.allWorkoutStatusses();
        return ResponseEntity.ok(exerciseDurationDTOList);
    }

    // Endpoint to delete an exercise duration report by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteExerciseDurationReportById(@PathVariable int id) {
        exerciseDurationService.deleteExerciseDurationEntityById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("currentUpdate/{userName}")
    public ResponseEntity<ExerciseDurationDTO> findExerciseReport(@PathVariable("userName") String userName) {
        ExerciseDurationDTO exerciseDurationDTO = exerciseDurationService.findByUserNameAndDate(userName);
        return ResponseEntity.ok(exerciseDurationDTO);
    }

    // Endpoint to update the calories of an ExerciseDurationEntity
    @PatchMapping("/calories/{id}/{newValue}")
    public ResponseEntity<Void> updateCalories(@PathVariable("id") int id, @PathVariable("newValue") String newCalories) {
        exerciseDurationService.updateCalories(id, newCalories);
        return ResponseEntity.noContent().build();
    }

    // Endpoint to update the start time of an ExerciseDurationEntity
    @PatchMapping("/startTime/{id}/{newStartTime}")
    public ResponseEntity<Void> updateStartTime(@PathVariable("id") int id, @PathVariable("newStartTime") String newStartTime) {
        exerciseDurationService.updateStartTime(id, newStartTime);
        return ResponseEntity.noContent().build();
    }

    // Endpoint to update the end time of an ExerciseDurationEntity
    @PatchMapping("/end-time/{id}/{newValue}")
    public ResponseEntity<Void> updateEndTime(@PathVariable("id") int id, @PathVariable("newValue") String newEndTime) {
        exerciseDurationService.updateEndTime(id, newEndTime);
        return ResponseEntity.noContent().build();
    }

    // Endpoint to update the duration of an exercise in a specific category
    @PatchMapping("/update-duration/{id}/{exercise}/{newValue}")
    public ResponseEntity<Void> updateExerciseDuration(
            @PathVariable("id") int id,
            @PathVariable("exercise") String exercise,
            @PathVariable("newValue") String newValue
    ) {
        exerciseDurationService.updateExerciseDuration(id, exercise, newValue);
        return ResponseEntity.noContent().build();
    }
}
