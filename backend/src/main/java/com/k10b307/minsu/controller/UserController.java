package com.k10b307.minsu.controller;

import com.k10b307.minsu.dto.request.user.UserLoginDto;
import com.k10b307.minsu.dto.request.user.UserRegisterDto;
import com.k10b307.minsu.dto.request.user.UserUpdateDto;
import com.k10b307.minsu.dto.response.user.UserResponseDto;
import com.k10b307.minsu.dto.response.user.UserTokenDto;
import com.k10b307.minsu.entity.User;
import com.k10b307.minsu.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/checkId")
    public ResponseEntity<?> checkIdDuplicate(@RequestParam String email) {
        userService.checkIdDuplicate(email);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDto> register(@RequestBody UserRegisterDto userRegisterDTO) {
        UserResponseDto successUser = userService.register(userRegisterDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(successUser);
    }

    @PostMapping("/login")
    public ResponseEntity<UserTokenDto> login(@RequestBody UserLoginDto userLoginDTO) {
        UserTokenDto loginDTO = userService.login(userLoginDTO);
        return ResponseEntity.status(HttpStatus.OK).header(loginDTO.getToken()).body(loginDTO);
    }

    @PostMapping("/checkPwd")
    public ResponseEntity<UserResponseDto> check(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> request) {
        String password = request.get("password");
        UserResponseDto userInfo = userService.check(user, password);
        return ResponseEntity.status(HttpStatus.OK).body(userInfo);
    }

    @PutMapping("/update")
    public ResponseEntity<UserResponseDto> update(
            @AuthenticationPrincipal User user,
            @RequestBody UserUpdateDto userUpdateDTO) {
        UserResponseDto userUpdate = userService.update(user, userUpdateDTO);
        return ResponseEntity.status(HttpStatus.OK).body(userUpdate);
    }
}
