package com.paradigmaslab.backend.application.ports.in;

import com.paradigmaslab.backend.domain.model.Request;
import java.util.List;

public interface RequestUseCase {
    Request createRequest(Request request);

    List<Request> getSortedRequests();
}
