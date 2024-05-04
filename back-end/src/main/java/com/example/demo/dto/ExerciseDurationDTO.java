package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseDurationDTO {
    private int id;
    private String userName;
    private String date;
    private String profilePicture;
    private String calories;
    private String startTime;
    private String endTime;

    // Chest exercises
    private String benchPress;
    private String dumbbellPress;
    private String pushUps;
    private String chestFlyes;
    private String inclineBenchPress;

    // Back exercises
    private String pullUps;
    private String latPulldowns;
    private String bentOverRows;
    private String seatedRows;
    private String deadlifts;

    // Shoulders exercises
    private String shoulderPress;
    private String lateralRaises;
    private String frontRaises;
    private String rearDeltFlyes;
    private String uprightRows;

    // Arms exercises
    private String bicepCurls;
    private String tricepDips;
    private String tricepPushdowns;
    private String hammerCurls;

    // Legs exercises
    private String squats;
    private String lunges;
    private String legPress;
    private String legCurls;
    private String legExtensions;

    // Core exercises
    private String plank;
    private String russianTwists;
    private String bicycleCrunches;
    private String legRaises;
    private String mountainClimbers;

    // Cardio exercises
    private String treadmill;
    private String elliptical;
    private String cycling;
    private String jumpRope;
    private String rowing;

    // Flexibility exercises
    private String yoga;
    private String dynamicStretches;
    private String staticStretches;
}
