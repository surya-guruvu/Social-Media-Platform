package com.smplatform.backend.restController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.smplatform.backend.exception.UserNotPresentException;
import com.smplatform.backend.model.User;
import com.smplatform.backend.service.JwtUtil;
import com.smplatform.backend.service.UserService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("/profile")
public class profileController {

    @Autowired
    UserService userService;

    @PostMapping("/ImageUpload")
    public ResponseEntity<?> imageUpload(@RequestParam("file") MultipartFile multipartFile, @RequestHeader("Authorization") String header) {
        if(multipartFile.isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Image not uploaded");
        }

        try{
            String jwt = header.substring(7);
            String identifier = JwtUtil.extractIdentifier(jwt);
            User user = userService.findByIdentifier(identifier);

            String extension = getExtension(multipartFile.getOriginalFilename());
            String fileName = user.getUniqueId() + extension;
            Path path = Paths.get("./profilePhotos",fileName);



            Files.copy(multipartFile.getInputStream(),path,StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok("Image Uploaded Successfully");

        }
        catch(IOException e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    @GetMapping("deleteProfilePhoto")
    public ResponseEntity<?> deleteProfilePhoto(@RequestParam("userUniqueId") String userUniqueId) {
        try{
            Path dir = Paths.get("./profilePhotos"); 
            Path imagePath = findFileWithExtension(dir, userUniqueId);

            Files.deleteIfExists(imagePath);

            return ResponseEntity.ok("Profile Photo is deleted");
        }
        catch(IOException e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
    

    @GetMapping("/profilePhoto")
    public ResponseEntity<?> getProfilePhoto(@RequestParam("userUniqueId") String userUniqueId) {
        System.out.println("Received request for userUniqueId: " + userUniqueId);
    
        Path imagePath = null;
        byte[] imageBytes = new byte[0]; 
        MediaType mediaType = MediaType.IMAGE_JPEG;
    
        try {
            Path dir = Paths.get("./profilePhotos"); 
            imagePath = findFileWithExtension(dir, userUniqueId);
    
            if (imagePath == null || !Files.exists(imagePath)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image Not Found");
            }
    
            // Reading the image file into bytes
            imageBytes = Files.readAllBytes(imagePath);
    
            // Determine the media type based on file extension
            String mimeType = Files.probeContentType(imagePath);
    
            if (mimeType != null) {
                switch (mimeType) {
                    case "image/png":
                        mediaType = MediaType.IMAGE_PNG;
                        break;
                    case "image/gif":
                        mediaType = MediaType.IMAGE_GIF;
                        break;
                    default:
                        mediaType = MediaType.IMAGE_JPEG; // Default to JPEG if unknown
                }
            }
    
        } catch (IOException e) {
            System.err.println("Error reading image file: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error reading image file");
        }
    
        return ResponseEntity.ok()
            .contentType(mediaType)
            .body(imageBytes);
    }


    @GetMapping("/userProfile")
    public ResponseEntity<?> getUserProfile(@RequestParam("userUniqueId") String userUniqueId) {
        ProfileResponse profileResponse = new ProfileResponse();

        User user = userService.findByUniqueId(userUniqueId);

        if(user==null){
            throw new UserNotPresentException("User Not Valid");
        }

        if(user.getUsername()!=null){
            profileResponse.setUsername(user.getUsername());
        }
        else{
            profileResponse.setUsername(user.getName());
        }

        profileResponse.setEmail(user.getEmail());

        return ResponseEntity.ok(profileResponse);
    }
    
    
    

    private String getExtension(String filename) {
        if (filename == null) {
            return "";
        }
        int dotIndex = filename.lastIndexOf('.');
        return (dotIndex == -1) ? "" : filename.substring(dotIndex);
    }
    
    private Path findFileWithExtension(Path dir, String baseName) throws IOException {
        if (Files.exists(dir) && Files.isDirectory(dir)) {
            try (var stream = Files.list(dir)) {
                return stream.filter(path -> path.getFileName().toString().startsWith(baseName))
                             .findFirst()
                             .orElse(null);
            }
        }
        return null;
    }
    
}

class ProfileResponse {
    private String username;
    private String email;

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email= email;
    }

}
