package com.paradigmaslab.backend.application.usecases;

import java.util.UUID;

import com.paradigmaslab.backend.domain.model.Topic;
import com.paradigmaslab.backend.domain.ports.TopicRepository;

public class UpdateTopicUseCase {

    private final TopicRepository repository;

    public UpdateTopicUseCase(TopicRepository repository) {
        this.repository = repository;
    }

    public Topic execute(UUID id, String title, String description) {
        Topic existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        Topic updated = existing.update(title, description);
        return repository.save(updated);
    }
}
