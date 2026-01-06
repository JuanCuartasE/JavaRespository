package com.paradigmaslab.backend.domain.model;

import java.util.UUID;

public class Topic {

    private UUID id;
    private String title;
    private String description;

    public Topic(UUID id, String title, String description) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("Title is required");
        }
        this.id = id;
        this.title = title;
        this.description = description;
    }

    public static Topic createNew(String title, String description) {
        return new Topic(UUID.randomUUID(), title, description);
    }

    public Topic update(String title, String description) {
        return new Topic(this.id, title, description);
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
