package com.k10b307.minsu.controller;

import com.k10b307.minsu.dto.response.file.ResFileDownloadDto;
import com.k10b307.minsu.dto.response.file.ResFileUploadDto;
import com.k10b307.minsu.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/post/{postId}/file")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<List<ResFileUploadDto>> upload (
            @PathVariable Long postId,
            @RequestParam("file") List<MultipartFile> files) throws IOException {
        List<ResFileUploadDto> saveFile = fileService.upload(postId, files);
        return ResponseEntity.status(HttpStatus.CREATED).body(saveFile);
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> download (
            @RequestParam("fileId") Long fileId) throws IOException {
        ResFileDownloadDto downloadDto = fileService.download(fileId);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.parseMediaType(downloadDto.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; fileName=\"" + downloadDto.getFilename() + "\"")
                .body(new ByteArrayResource(downloadDto.getContent()));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Long> delete (
            @RequestParam("fileId") Long fileId) {
        fileService.delete(fileId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
