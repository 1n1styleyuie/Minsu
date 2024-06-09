package com.k10b307.minsu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class MinsuApplication {

	public static void main(String[] args) {
		SpringApplication.run(MinsuApplication.class, args);
	}

}
