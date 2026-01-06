package com.paradigmaslab.backend.adapters.in.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public String health() {
        return "Mi novia Elizabeth Castro es la mujer mas hermosa del mundo";
    }
}
