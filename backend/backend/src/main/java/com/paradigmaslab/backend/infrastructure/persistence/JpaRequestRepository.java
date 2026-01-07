package com.paradigmaslab.backend.infrastructure.persistence;

import com.paradigmaslab.backend.application.ports.out.RequestRepository;
import com.paradigmaslab.backend.domain.model.Request;
import com.paradigmaslab.backend.infrastructure.persistence.jpa.SpringDataRequestRepository;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@Primary
public class JpaRequestRepository implements RequestRepository {
    private final SpringDataRequestRepository springDataRequestRepository;

    public JpaRequestRepository(SpringDataRequestRepository springDataRequestRepository) {
        this.springDataRequestRepository = springDataRequestRepository;
    }

    @Override
    public Request save(Request request) {
        return springDataRequestRepository.save(request);
    }

    @Override
    public List<Request> findAll() {
        return springDataRequestRepository.findAll();
    }

    @Override
    public List<Request> findByCreatorUsername(String username) {
        return springDataRequestRepository.findByCreatorUsername(username);
    }
}
