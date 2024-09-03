package com.example.japanese_hotel_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class JapaneseHotelServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(JapaneseHotelServerApplication.class, args);
	}

}
