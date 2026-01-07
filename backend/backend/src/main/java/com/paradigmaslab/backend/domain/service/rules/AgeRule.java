package com.paradigmaslab.backend.domain.service.rules;

import com.paradigmaslab.backend.domain.model.Request;
import com.paradigmaslab.backend.domain.service.PriorityRule;
import java.time.LocalDateTime;
import java.time.Duration;

public class AgeRule implements PriorityRule {
    @Override
    public double calculateScore(Request request) {
        long hoursOld = Duration.between(request.getCreationDate(), LocalDateTime.now()).toHours();
        return hoursOld * 0.5; // Example: 0.5 points per hour
    }
}
