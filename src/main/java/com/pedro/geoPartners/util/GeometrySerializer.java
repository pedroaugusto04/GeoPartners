/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pedro.geoPartners.util;

/**
 *
 * @author pedro
 */
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import java.io.IOException;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.geom.LineString;
import org.locationtech.jts.geom.MultiPolygon;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.Polygon;

public class GeometrySerializer extends JsonSerializer<Geometry> {

    @Override
    public void serialize(Geometry geometry, JsonGenerator jgen, SerializerProvider provider) throws IOException {
        try {
            writeGeometry(jgen, geometry);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    public void writeGeometry(JsonGenerator jgen, Geometry geometry)
            throws IOException, Exception {
        if (geometry instanceof MultiPolygon) {
            writeMultiPolygon(jgen, (MultiPolygon) geometry);

        } else if (geometry instanceof Point) {
            writePoint(jgen, (Point) geometry);

        } else {
            throw new Exception("Error serializing Geometry to Json");
        }
    }

    private void writeMultiPolygon(JsonGenerator jgen, MultiPolygon multiPolygon) throws IOException {
        jgen.writeStartObject();
        jgen.writeStringField("type", multiPolygon.getGeometryType());
        jgen.writeArrayFieldStart("coordinates");

        for (int i = 0; i != multiPolygon.getNumGeometries(); ++i) {
            writePolygonCoordinates(jgen, (Polygon) multiPolygon.getGeometryN(i));
        }

        jgen.writeEndArray();
        jgen.writeEndObject();
    }

    private void writePolygonCoordinates(JsonGenerator jgen, Polygon polygon) throws IOException {
        jgen.writeStartArray();
        writeLineStringCoords(jgen, polygon.getExteriorRing());

        for (int i = 0; i < polygon.getNumInteriorRing(); ++i) {
            writeLineStringCoords(jgen, polygon.getInteriorRingN(i));
        }
        jgen.writeEndArray();
    }

    private void writeLineStringCoords(JsonGenerator jgen, LineString ring)
            throws IOException {
        jgen.writeStartArray();
        for (int i = 0; i != ring.getNumPoints(); ++i) {
            Point p = ring.getPointN(i);
            writePointCoords(jgen, p);
        }
        jgen.writeEndArray();
    }

    private void writePoint(JsonGenerator jgen, Point point) throws IOException {
        jgen.writeStartObject();
        jgen.writeStringField("type", point.getGeometryType());
        jgen.writeFieldName("coordinates");
        writePointCoords(jgen, point);
        jgen.writeEndObject();
    }

    private void writePointCoords(JsonGenerator jgen, Point point) throws IOException {
        jgen.writeStartArray();

        jgen.writeNumber(point.getCoordinate().x);
        jgen.writeNumber(point.getCoordinate().y);

        if (!Double.isNaN(point.getCoordinate().z)) {
            jgen.writeNumber(point.getCoordinate().z);
        }
        jgen.writeEndArray();
    }

}
