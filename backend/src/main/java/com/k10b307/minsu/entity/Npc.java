package com.k10b307.minsu.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Npc {
    @Id
    @GeneratedValue
    private Long npcId;

    private Long typeId;
    private Long talkId;
    private Boolean isStart;
    private String talk;
}