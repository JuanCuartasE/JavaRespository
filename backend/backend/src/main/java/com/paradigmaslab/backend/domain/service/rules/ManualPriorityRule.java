package com.paradigmaslab.backend.domain.service.rules;

import com.paradigmaslab.backend.domain.model.Request;
import com.paradigmaslab.backend.domain.service.PriorityRule;

public class ManualPriorityRule implements PriorityRule {
    @Override
    public double calculateScore(Request request) {
        return request.getManualPriority() * 10.0; // Scale 1-5 to 10-50
    }
}
