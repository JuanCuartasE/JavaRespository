package com.paradigmaslab.backend.infrastructure.persistence.jpa;

import com.paradigmaslab.backend.domain.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SpringDataRequestRepository extends JpaRepository<Request, Long> {
    List<Request> findByCreatorUsername(String username);
}
