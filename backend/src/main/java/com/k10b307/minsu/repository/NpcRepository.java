package com.k10b307.minsu.repository;

import com.k10b307.minsu.entity.Npc;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NpcRepository extends JpaRepository<Npc, Long> {
    long countByTypeIdAndIsStart(Long typeId, Boolean isStart);

    List<Npc> findByTypeIdAndTalkId(Long typeId, Long talkId);
}