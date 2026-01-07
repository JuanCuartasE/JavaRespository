package com.paradigmaslab.backend.application.ports.out;

import com.paradigmaslab.backend.domain.model.Request;
import java.util.List;

public interface RequestRepository {
    Request save(Request request);

    List<Request> findAll();

    List<Request> findByCreatorUsername(String username);
}
