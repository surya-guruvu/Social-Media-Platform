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

	// @Autowired
	// private EmailService emailService;

	public static void main(String[] args) {
		ApplicationContext context =  SpringApplication.run(BackendApplication.class, args);
		
		// BackendApplication app = context.getBean(BackendApplication.class);


		// app.Run();
		
	}

	// private void Run(){
	// 	emailService.sendVerificationEmail("iasayrus0007@gmail.com","subject","subject");
	// }

}
