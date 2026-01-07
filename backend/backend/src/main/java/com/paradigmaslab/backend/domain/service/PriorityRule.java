package com.paradigmaslab.backend.domain.service;

import com.paradigmaslab.backend.domain.model.Request;

public interface PriorityRule {
    double calculateScore(Request request);
}
