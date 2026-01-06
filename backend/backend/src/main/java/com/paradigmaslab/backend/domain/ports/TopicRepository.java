package com.paradigmaslab.backend.domain.ports;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.paradigmaslab.backend.domain.model.Topic;

public interface TopicRepository {

    Topic save(Topic topic);

    Optional<Topic> findById(UUID id);

    List<Topic> findAll();
}
