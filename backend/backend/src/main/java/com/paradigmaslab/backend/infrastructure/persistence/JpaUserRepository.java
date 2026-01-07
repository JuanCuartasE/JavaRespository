package com.paradigmaslab.backend.infrastructure.persistence;

import com.paradigmaslab.backend.application.ports.out.UserRepository;
import com.paradigmaslab.backend.domain.model.User;
import com.paradigmaslab.backend.infrastructure.persistence.jpa.SpringDataUserRepository;
import org.springframework.stereotype.Component;
import java.util.Optional;

@Component
public class JpaUserRepository implements UserRepository {
    private final SpringDataUserRepository springDataUserRepository;

    public JpaUserRepository(SpringDataUserRepository springDataUserRepository) {
        this.springDataUserRepository = springDataUserRepository;
    }

    @Override
    public User save(User user) {
        return springDataUserRepository.save(user);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return springDataUserRepository.findByUsername(username);
    }
}
