package com.paradigmaslab.backend.adapters.out.persistence;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SpringTopicJpaRepository extends JpaRepository<TopicEntity, UUID> {
}
