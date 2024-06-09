package com.k10b307.minsu.service;

import com.k10b307.minsu.entity.Description;
import com.k10b307.minsu.repository.DescRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DescService {
    public final DescRepository descRepository;

    public List<Description> descriptionList(Long archId) {
        return descRepository.findByArchId(archId);
    }
}