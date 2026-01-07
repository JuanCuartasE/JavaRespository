package com.paradigmaslab.backend.infrastructure.controllers;

import com.paradigmaslab.backend.application.ports.in.RequestUseCase;
import com.paradigmaslab.backend.domain.model.Request;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*") // Allow for local development
public class RequestController {
    private final RequestUseCase requestUseCase;

    public RequestController(RequestUseCase requestUseCase) {
        this.requestUseCase = requestUseCase;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('USUARIO_COMUN', 'ADMIN', 'OWNER')")
    public Request createRequest(@RequestBody Request request) {
        return requestUseCase.createRequest(request);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('USUARIO_COMUN', 'ADMIN', 'OWNER')")
    public List<Request> getSortedRequests(Authentication authentication) {
        String username = authentication.getName();
        boolean isAdminOrOwner = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_OWNER"));

        if (isAdminOrOwner) {
            return requestUseCase.getSortedRequests();
        } else {
            // For common users, we might need a specific use case or filter here.
            // For now, let's assume getSortedRequests can be filtered or we add a specific
            // port.
            return requestUseCase.getSortedRequests().stream()
                    .filter(r -> r.getUser().equals(username))
                    .toList();
        }
    }
}
