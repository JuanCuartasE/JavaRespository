package com.paradigmaslab.backend.domain.service;

import com.paradigmaslab.backend.domain.model.Request;
import java.util.List;

public class PriorityCalculator {
    private final List<PriorityRule> rules;

    public PriorityCalculator(List<PriorityRule> rules) {
        this.rules = rules;
    }

    public double calculateTotalPriority(Request request) {
        return rules.stream()
                .mapToDouble(rule -> rule.calculateScore(request))
                .sum();
    }
}
