package com.paradigmaslab.backend.domain.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "requests")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private RequestType type;

    private int manualPriority;
    private LocalDateTime creationDate;

    @Column(name = "user_name") // Keeping the database column as user_name for clarity
    private String user;

    private double calculatedPriority;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User creator;

    public Request() {
        this.creationDate = LocalDateTime.now();
    }

    public Request(Long id, RequestType type, int manualPriority, String user, User creator) {
        this.id = id;
        this.type = type;
        this.manualPriority = manualPriority;
        this.user = user;
        this.creator = creator;
        this.creationDate = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RequestType getType() {
        return type;
    }

    public void setType(RequestType type) {
        this.type = type;
    }

    public int getManualPriority() {
        return manualPriority;
    }

    public void setManualPriority(int manualPriority) {
        this.manualPriority = manualPriority;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public double getCalculatedPriority() {
        return calculatedPriority;
    }

    public void setCalculatedPriority(double calculatedPriority) {
        this.calculatedPriority = calculatedPriority;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }
}
