package com.k10b307.minsu.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/api/download")
public class DownloadController {

//    @Value("${external.file.path}")
//    private String filePath;
//
//    @GetMapping
//    public ResponseEntity<Resource> downloadFile() throws IOException {
//        File file = new File(filePath);
//
//        if (!file.exists()) {
//            System.out.println("===================================");
//            System.out.println("$$ 파일이 없어용 $$");
//            System.out.println("===================================");
//        }
//
//        if (file.exists()) {
//            System.out.println("===================================");
//            System.out.println("##" + file + "##");
//            System.out.println("===================================");
//        }
//
//        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=minsu.zip");
//
//        return ResponseEntity.ok()
//                .headers(headers)
//                .contentLength(file.length())
//                .contentType(MediaType.APPLICATION_OCTET_STREAM)
//                .body(resource);
//    }
}

