package com.william.backend.web;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class HomeController {
    
    @GetMapping("/")
    public String home() {
        return "helloe home";
    }

    @GetMapping("/secured")
    public String secured() {
        return "Hello secured!";
    }
    
}
