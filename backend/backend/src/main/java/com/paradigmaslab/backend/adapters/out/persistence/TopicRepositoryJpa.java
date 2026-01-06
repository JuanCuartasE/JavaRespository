package com.paradigmaslab.backend.adapters.out.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.paradigmaslab.backend.domain.model.Topic;
import com.paradigmaslab.backend.domain.ports.TopicRepository;

@Repository
public class TopicRepositoryJpa implements TopicRepository {

    private final SpringTopicJpaRepository jpa;

    public TopicRepositoryJpa(SpringTopicJpaRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public Topic save(Topic topic) {
        TopicEntity entity = new TopicEntity(
                topic.getId(),
                topic.getTitle(),
                topic.getDescription()
        );
        TopicEntity saved = jpa.save(entity);
        return new Topic(saved.getId(), saved.getTitle(), saved.getDescription());
    }

    @Override
    public Optional<Topic> findById(UUID id) {
        return jpa.findById(id)
                .map(e -> new Topic(e.getId(), e.getTitle(), e.getDescription()));
    }

    @Override
    public List<Topic> findAll() {
        return jpa.findAll()
                .stream()
                .map(e -> new Topic(e.getId(), e.getTitle(), e.getDescription()))
                .toList();
    }
}
