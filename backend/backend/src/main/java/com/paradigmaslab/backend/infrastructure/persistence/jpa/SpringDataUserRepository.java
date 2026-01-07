package com.paradigmaslab.backend.infrastructure.persistence.jpa;

import com.paradigmaslab.backend.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SpringDataUserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
