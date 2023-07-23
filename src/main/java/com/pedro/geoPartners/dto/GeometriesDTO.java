/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pedro.geoPartners.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.pedro.geoPartners.util.GeometryDeserializer;
import com.pedro.geoPartners.util.GeometrySerializer;
import com.pedro.geoPartners.util.GeometryType;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.Type;
import org.locationtech.jts.geom.Geometry;

/**
 *
 * @author pedro
 */
public class GeometriesDTO {

    @JsonDeserialize(using = GeometryDeserializer.class)
    @JsonSerialize(using = GeometrySerializer.class)
    @Type(GeometryType.class)
    @NotNull
    public Geometry address;
    
    @JsonDeserialize(using = GeometryDeserializer.class)
    @JsonSerialize(using = GeometrySerializer.class)
    @Type(GeometryType.class)
    @NotNull
    private Geometry coverageArea;

    public Geometry getAddress() {
        return address;
    }

    public Geometry getCoverageArea() {
        return coverageArea;
    }
    
}
