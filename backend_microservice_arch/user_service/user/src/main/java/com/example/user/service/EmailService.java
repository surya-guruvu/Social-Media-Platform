package com.example.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Component
public class EmailService {

    @Autowired
    public JavaMailSender mailSender;

    public void sendEmail(String to,String sub, String body){
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);
        message.setSubject(sub);
        message.setText(body);

        mailSender.send(message);
    }


}
