/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pedro.geoPartners.util;

/**
 *
 * @author pedro
 */
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.geojson.GeoJsonReader;

public class GeometryDeserializer extends JsonDeserializer<Geometry> {
    
    private static final GeoJsonReader geoJsonReader = new GeoJsonReader();

    @Override
    public Geometry deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        String geoJson = parser.getValueAsString();
        try {
            return (Geometry) geoJsonReader.read(geoJson);
        } catch (ParseException e) {
            throw new IOException(e);
        }
    }
}
