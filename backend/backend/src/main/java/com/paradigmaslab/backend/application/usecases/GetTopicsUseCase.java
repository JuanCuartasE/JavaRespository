package com.paradigmaslab.backend.application.usecases;

import java.util.List;

import com.paradigmaslab.backend.domain.model.Topic;
import com.paradigmaslab.backend.domain.ports.TopicRepository;

public class GetTopicsUseCase {

    private final TopicRepository repository;

    public GetTopicsUseCase(TopicRepository repository) {
        this.repository = repository;
    }

    public List<Topic> execute() {
        return repository.findAll();
    }
}
