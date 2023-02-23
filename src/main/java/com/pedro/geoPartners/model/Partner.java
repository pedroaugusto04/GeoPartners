/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pedro.geoPartners.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.UUID;


/**
 *
 * @author pedro
 */
@Entity
public class Partner {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID )
    private UUID id;
    private String tradingName;
    private String ownerName;
    private String document;
    private String coverageArea; 
    private String address; 

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getId() {
        return id;
    }

    public String getTradingName() {
        return tradingName;
    }

    public String getDocument() {
        return document;
    }


    public void setTradingName(String tradingName) {
        this.tradingName = tradingName;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getCoverageArea() {
        return coverageArea;
    }

    public void setCoverageArea(String coverageArea) {
        this.coverageArea = coverageArea;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
