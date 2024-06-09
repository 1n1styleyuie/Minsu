package com.k10b307.minsu.service;

import com.k10b307.minsu.common.exception.ResourceNotFoundException;
import com.k10b307.minsu.common.exception.UserException;
import com.k10b307.minsu.dto.request.user.UserLoginDto;
import com.k10b307.minsu.dto.request.user.UserRegisterDto;
import com.k10b307.minsu.dto.request.user.UserUpdateDto;
import com.k10b307.minsu.dto.response.user.UserResponseDto;
import com.k10b307.minsu.dto.response.user.UserTokenDto;
import com.k10b307.minsu.entity.User;
import com.k10b307.minsu.repository.UserRepository;
import com.k10b307.minsu.security.jwt.CustomUserDetailsService;
import com.k10b307.minsu.security.jwt.JwtTokenUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService {

    private final PasswordEncoder encoder;
    private final UserRepository userRepository;

    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtTokenUtil jwtTokenUtil;

    public HttpStatus checkIdDuplicate(String email) {
        isExistUserEmail(email);
        return HttpStatus.OK;
    }

    public UserResponseDto register(UserRegisterDto registerDto) {
        isExistUserEmail(registerDto.getEmail());
        checkPassword(registerDto.getPassword(), registerDto.getPasswordCheck());

        // 패스워드 암호화
        String encodePwd = encoder.encode(registerDto.getPassword());
        registerDto.setPassword(encodePwd);

        User saveUser = userRepository.save(
                UserRegisterDto.ofEntity(registerDto));

        return UserResponseDto.fromEntity(saveUser);
    }


    public UserTokenDto login(UserLoginDto loginDto) {
        authenticate(loginDto.getEmail(), loginDto.getPassword());
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginDto.getEmail());
        checkEncodePassword(loginDto.getPassword(), userDetails.getPassword());
        String token = jwtTokenUtil.generateToken(userDetails);
        return UserTokenDto.fromEntity(userDetails, token);
    }

    public UserResponseDto check(User user, String password) {
        User checkUser = (User) userDetailsService.loadUserByUsername(user.getEmail());
        checkEncodePassword(password, checkUser.getPassword());
        return UserResponseDto.fromEntity(checkUser);
    }

    public UserResponseDto update(User user, UserUpdateDto updateDto) {
        checkPassword(updateDto.getPassword(), updateDto.getPasswordCheck());
        String encodePwd = encoder.encode(updateDto.getPassword());
        User updateUser =  userRepository.findByEmail(user.getEmail()).orElseThrow(
                () -> new ResourceNotFoundException("User", "User Email", user.getEmail())
        );
        updateUser.update(encodePwd, updateDto.getUsername());
        return UserResponseDto.fromEntity(updateUser);
    }

    /**
     * 사용자 인증
     * @param email
     * @param pwd
     */
    private void authenticate(String email, String pwd) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, pwd));
        } catch (DisabledException e) {
            throw new UserException("인증되지 않은 아이디입니다.", HttpStatus.BAD_REQUEST);
        } catch (BadCredentialsException e) {
            throw new UserException("비밀번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 아이디(이메일) 중복 체크
     * @param email
     */
    private void isExistUserEmail(String email) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new UserException("이미 사용 중인 이메일입니다.", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 비밀번호와 비밀번호 확인이 같은지 체크
     * @param password
     * @param passwordCheck
     */
    private void checkPassword(String password, String passwordCheck) {
        if (!password.equals(passwordCheck)) {
            throw new UserException("패스워드 불일치", HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 사용자가 입력한 비번과 DB에 저장된 비번이 같은지 체크 : 인코딩 확인
     * @param rawPassword
     * @param encodedPassword
     */
    private void checkEncodePassword(String rawPassword, String encodedPassword) {
        if (!encoder.matches(rawPassword, encodedPassword)) {
            throw new UserException("패스워드 불일치", HttpStatus.BAD_REQUEST);
        }
    }
}
