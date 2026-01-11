package com.paradigmaslab.backend.domain.service.rules;

import com.paradigmaslab.backend.domain.model.Request;
import com.paradigmaslab.backend.domain.service.PriorityRule;

public class ManualPriorityRule implements PriorityRule {
    @Override
    public double calculateScore(Request request) {
        return (double) request.getManualPriority();
    }
}
