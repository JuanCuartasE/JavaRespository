package com.paradigmaslab.backend.application.usecases;

import java.util.UUID;

import com.paradigmaslab.backend.domain.model.Topic;
import com.paradigmaslab.backend.domain.ports.TopicRepository;

public class GetTopicByIdUseCase {

    private final TopicRepository repository;

    public GetTopicByIdUseCase(TopicRepository repository) {
        this.repository = repository;
    }

    public Topic execute(UUID id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Topic not found"));
    }
}
