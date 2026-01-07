package com.paradigmaslab.backend.domain.service.rules;

import com.paradigmaslab.backend.domain.model.Request;
import com.paradigmaslab.backend.domain.model.RequestType;
import com.paradigmaslab.backend.domain.service.PriorityRule;

public class TypeRule implements PriorityRule {
    @Override
    public double calculateScore(Request request) {
        if (request.getType() == RequestType.INCIDENTE) {
            return 10.0;
        } else if (request.getType() == RequestType.REQUERIMIENTO) {
            return 5.0;
        }
        return 0.0;
    }
}
