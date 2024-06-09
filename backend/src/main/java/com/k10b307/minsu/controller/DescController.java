package com.k10b307.minsu.controller;

import com.k10b307.minsu.entity.Description;
import com.k10b307.minsu.service.DescService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/data")
public class DescController {
    private final DescService descService;

    @GetMapping("/{dataId}")
    public ResponseEntity<List<Description>> getDescription(@PathVariable Long dataId) {
        return new ResponseEntity<>(descService.descriptionList(dataId), HttpStatus.OK);
    }
}