package com.paradigmaslab.backend.application.services;

import com.paradigmaslab.backend.application.ports.in.RequestUseCase;
import com.paradigmaslab.backend.application.ports.out.RequestRepository;
import com.paradigmaslab.backend.domain.model.Request;
import com.paradigmaslab.backend.domain.service.PriorityCalculator;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequestService implements RequestUseCase {
    private final RequestRepository requestRepository;
    private final PriorityCalculator priorityCalculator;

    public RequestService(RequestRepository requestRepository, PriorityCalculator priorityCalculator) {
        this.requestRepository = requestRepository;
        this.priorityCalculator = priorityCalculator;
    }

    @Override
    public Request createRequest(Request request) {
        // Calculate priority before saving or just save and calculate on retrieval
        // Let's calculate and set it for storage efficiency if sorting is frequent
        double priority = priorityCalculator.calculateTotalPriority(request);
        request.setCalculatedPriority(priority);
        return requestRepository.save(request);
    }

    @Override
    public List<Request> getSortedRequests() {
        List<Request> requests = requestRepository.findAll();
        // Recalculate priority to account for "AgeRule" which changes over time
        return requests.stream()
                .peek(r -> r.setCalculatedPriority(priorityCalculator.calculateTotalPriority(r)))
                .sorted((r1, r2) -> Double.compare(r2.getCalculatedPriority(), r1.getCalculatedPriority()))
                .collect(Collectors.toList());
    }
}
