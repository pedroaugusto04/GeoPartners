/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pedro.geoPartners.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.UUID;
import org.locationtech.jts.geom.MultiPolygon;
import org.locationtech.jts.geom.Point;

/**
 *
 * @author pedro
 */
@Entity
public class Partner {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String tradingName;
    private String ownerName;
    private String document;

    @Column(columnDefinition = "geometry(Point,4326)")
    private Point address;

    @Column(columnDefinition = "geometry(MultiPolygon,4326)")
    private MultiPolygon coverageArea;

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

    public Point getAddress() {
        return address;
    }

    public void setAddress(Point address) {
        this.address = address;
    }

    public MultiPolygon getCoverageArea() {
        return coverageArea;
    }

    public void setCoverageArea(MultiPolygon coverageArea) {
        this.coverageArea = coverageArea;
    }
}
