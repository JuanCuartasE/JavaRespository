package com.paradigmaslab.backend.adapters.in.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String welcome() {
        return "Backend del Motor de Priorización - Paradigmas Lab (Activo)";
    }

    @GetMapping("/api/health")
    public String health() {
        return "OK - Paradigmas Lab backend running Wuuuuuuu!";
    }
}
