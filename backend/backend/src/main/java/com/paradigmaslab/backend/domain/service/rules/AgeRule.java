package com.paradigmaslab.backend.domain.service.rules;

import com.paradigmaslab.backend.domain.model.Request;
import com.paradigmaslab.backend.domain.service.PriorityRule;
import java.time.LocalDateTime;
import java.time.Duration;

public class AgeRule implements PriorityRule {
    @Override
    public double calculateScore(Request request) {
        long minutesOld = Duration.between(request.getCreationDate(), LocalDateTime.now()).toMinutes();
        return minutesOld * 0.1; // 0.1 points per minute (6 points per hour)
    }
}
