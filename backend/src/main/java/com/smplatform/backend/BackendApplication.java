package com.smplatform.backend;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.ApplicationContext;

// import com.smplatform.backend.service.EmailService;

@SpringBootApplication
@EnableFeignClients
public class BackendApplication {

	public static void main(String[] args) {
		ApplicationContext context =  SpringApplication.run(BackendApplication.class, args);
	}
}
