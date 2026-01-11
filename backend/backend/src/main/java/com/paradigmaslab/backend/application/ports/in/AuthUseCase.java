package com.paradigmaslab.backend.application.ports.in;

import com.paradigmaslab.backend.domain.model.User;

public interface AuthUseCase {
    User signup(User user);

    String login(String username, String password);
}
