package com.k10b307.minsu.service;

import com.k10b307.minsu.entity.Npc;
import com.k10b307.minsu.repository.NpcRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class NpcService {
    private final NpcRepository npcRepository;

    public List<Npc> talkList(Long typeId) {
        long cnt = npcRepository.countByTypeIdAndIsStart(typeId, true);

        Long randomTalkId = ThreadLocalRandom.current().nextLong(1L, cnt+1L);

        return npcRepository.findByTypeIdAndTalkId(typeId, randomTalkId);
    }
}