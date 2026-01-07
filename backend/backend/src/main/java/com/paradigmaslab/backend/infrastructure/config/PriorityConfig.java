package com.paradigmaslab.backend.infrastructure.config;

import com.paradigmaslab.backend.domain.service.PriorityCalculator;
import com.paradigmaslab.backend.domain.service.PriorityRule;
import com.paradigmaslab.backend.domain.service.rules.AgeRule;
import com.paradigmaslab.backend.domain.service.rules.ManualPriorityRule;
import com.paradigmaslab.backend.domain.service.rules.TypeRule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class PriorityConfig {

    @Bean
    public PriorityCalculator priorityCalculator() {
        return new PriorityCalculator(Arrays.asList(
                new TypeRule(),
                new AgeRule(),
                new ManualPriorityRule()));
    }
}
