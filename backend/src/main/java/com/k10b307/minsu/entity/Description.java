package com.k10b307.minsu.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Description {
    @Id
    @GeneratedValue
    private Long descId;

    private Long mapId;
    private Long archId;
    private String archName;
    private String archDescription;
}