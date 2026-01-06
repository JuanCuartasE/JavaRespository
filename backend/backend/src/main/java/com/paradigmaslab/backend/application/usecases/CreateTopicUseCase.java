package com.paradigmaslab.backend.application.usecases;

import com.paradigmaslab.backend.domain.model.Topic;
import com.paradigmaslab.backend.domain.ports.TopicRepository;

public class CreateTopicUseCase {

    private final TopicRepository repository;

    public CreateTopicUseCase(TopicRepository repository) {
        this.repository = repository;
    }

    public Topic execute(String title, String description) {
        Topic topic = Topic.createNew(title, description);
        return repository.save(topic);
    }
}
