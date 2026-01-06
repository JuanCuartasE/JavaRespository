package com.paradigmaslab.backend.adapters.in.web;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paradigmaslab.backend.application.usecases.CreateTopicUseCase;
import com.paradigmaslab.backend.application.usecases.GetTopicByIdUseCase;
import com.paradigmaslab.backend.application.usecases.GetTopicsUseCase;
import com.paradigmaslab.backend.application.usecases.UpdateTopicUseCase;
import com.paradigmaslab.backend.domain.model.Topic;
import com.paradigmaslab.backend.domain.ports.TopicRepository;

@RestController
@RequestMapping("/api/topics")
public class TopicController {

    private final CreateTopicUseCase createUseCase;
    private final UpdateTopicUseCase updateUseCase;
    private final GetTopicsUseCase getTopicsUseCase;
    private final GetTopicByIdUseCase getTopicByIdUseCase;

    public TopicController(TopicRepository repository) {
        this.createUseCase = new CreateTopicUseCase(repository);
        this.updateUseCase = new UpdateTopicUseCase(repository);
        this.getTopicsUseCase = new GetTopicsUseCase(repository);
        this.getTopicByIdUseCase = new GetTopicByIdUseCase(repository);
    }

    @PostMapping
    public Topic create(@RequestBody TopicRequest request) {
        return createUseCase.execute(request.title(), request.description());
    }

    @PutMapping("/{id}")
    public Topic update(@PathVariable UUID id, @RequestBody TopicRequest request) {
        return updateUseCase.execute(id, request.title(), request.description());
    }

    @GetMapping
    public List<Topic> findAll() {
        return getTopicsUseCase.execute();
    }

    @GetMapping("/{id}")
    public Topic findById(@PathVariable UUID id) {
        return getTopicByIdUseCase.execute(id);
    }

    record TopicRequest(String title, String description) {}
}
