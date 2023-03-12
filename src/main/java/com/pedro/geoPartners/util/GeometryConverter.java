/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pedro.geoPartners.util;

import jakarta.persistence.AttributeConverter;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.WKBWriter;

import java.util.concurrent.locks.ReentrantLock;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.io.WKBReader;

/**
 *
 * @author pedro
 */
public class GeometryConverter implements AttributeConverter<Geometry, byte[]> {

    private static final WKBWriter wkbWriter = new WKBWriter();

    private static final WKBReader wkbReader = new WKBReader();

    //synchronization to avoid conflicts
    private static final ReentrantLock writeLock = new ReentrantLock();

    private static final ReentrantLock readLock = new ReentrantLock();

    @Override
    public byte[] convertToDatabaseColumn(Geometry geometry) {
        writeLock.lock();
        if (geometry == null) {
            return null;
        }
        try {
            return wkbWriter.write(geometry);
        } finally {
            writeLock.unlock();
        }
    }

    @Override
    public Geometry convertToEntityAttribute(byte[] dbData) {
        readLock.lock();
        if (dbData == null) {
            return null;
        }
        try {
            return wkbReader.read(dbData);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        } finally {
            readLock.unlock();
        }
    }

}
