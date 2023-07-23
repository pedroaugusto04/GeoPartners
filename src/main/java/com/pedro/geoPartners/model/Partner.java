/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pedro.geoPartners.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.pedro.geoPartners.util.GeometryDeserializer;
import com.pedro.geoPartners.util.GeometrySerializer;
import com.pedro.geoPartners.util.GeometryType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import org.hibernate.annotations.Type;
import org.locationtech.jts.geom.Geometry;

/**
 *
 * @author pedro
 */
@Entity
public class Partner {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotNull
    private String tradingName;
    @NotNull
    private String ownerName;
    @Column(unique = true)
    @NotNull
    private String document;

    @JsonDeserialize(using = GeometryDeserializer.class)
    @JsonSerialize(using = GeometrySerializer.class)
    @Type(GeometryType.class)
    @Column(columnDefinition = "geometry(Point,4326)")
    @NotNull
    private Geometry address;

    @JsonDeserialize(using = GeometryDeserializer.class)
    @JsonSerialize(using = GeometrySerializer.class)
    @Type(GeometryType.class)
    @Column(columnDefinition = "geometry(MultiPolygon,4326)")
    @NotNull
    private Geometry coverageArea;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTradingName() {
        return tradingName;
    }

    public void setTradingName(String tradingName) {
        this.tradingName = tradingName;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    @JsonIgnore
    public Geometry getAddress() {
        return address;
    }

    public void setAddress(Geometry address) {
        this.address = address;
    }

    @JsonIgnore
    public Geometry getCoverageArea() {
        return coverageArea;
    }
    
    public void setCoverageArea(Geometry coverageArea) {
        this.coverageArea = coverageArea;
    }

    
}
