package com.paradigmaslab.backend.adapters.out.persistence;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class TopicEntity {

    @Id
    private UUID id;
    private String title;
    private String description;

    public TopicEntity() {}

    public TopicEntity(UUID id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
