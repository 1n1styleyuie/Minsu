package com.k10b307.minsu.controller;

import com.k10b307.minsu.entity.Npc;
import com.k10b307.minsu.service.NpcService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/npc")
public class NpcController {
    private final NpcService npcService;

    @GetMapping
    public String test() {
        String gpuUrl = "http://175.209.203.185:5000/";

        try {
            RestTemplate restTemplate = new RestTemplate();
            String jsonResponse = restTemplate.getForObject(gpuUrl, String.class);
            return jsonResponse;

        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    @GetMapping("/{typeId}")
    public ResponseEntity<List<Npc>> getTalk(@PathVariable Long typeId) {
        return new ResponseEntity<>(npcService.talkList(typeId), HttpStatus.OK);
    }
}