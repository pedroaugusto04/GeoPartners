/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pedro.geoPartners.util;

/**
 *
 * @author pedro
 */
import java.io.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.usertype.UserType;
import org.locationtech.jts.geom.Geometry;
import org.locationtech.jts.io.WKBReader;
import org.locationtech.jts.io.WKBWriter;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Objects;
import java.util.Optional;

@Slf4j
public class GeometryType implements UserType<Geometry> {

    @Override
    public int getSqlType() {
        return Types.BINARY;
    }

    @Override
    public Class<Geometry> returnedClass() {
        return Geometry.class;
    }

    @Override
    public boolean equals(Geometry o, Geometry o1) throws HibernateException {
        return Objects.equals(o, o1);
    }

    @Override
    public int hashCode(Geometry o) throws HibernateException {
        return Objects.hashCode(o);
    }

    @Override
    public Geometry nullSafeGet(ResultSet rs, int position, SharedSessionContractImplementor session, Object owner) throws SQLException {
        if (rs.wasNull()) {
            return null;
        }
        try {
            String string = rs.getString(position);
            final byte[] bytes = WKBReader.hexToBytes(string);
            return new WKBReader().read(bytes);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void nullSafeSet(PreparedStatement ps, Geometry geometry, int i, SharedSessionContractImplementor sc) throws HibernateException, SQLException {
        if (Objects.isNull(geometry)) {
            ps.setNull(i, Types.BINARY);
            return;
        }
        byte[] write = new WKBWriter().write(geometry);
        try (InputStream is = new ByteArrayInputStream(Optional.of(write).get())) {
            ps.setBinaryStream(i, is);
        } catch (IOException | NullPointerException e) {
            throw new SQLException(e);
        }
    }

    @Override
    public Geometry deepCopy(Geometry geometry) throws HibernateException {

        try {
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ObjectOutputStream oos = new ObjectOutputStream(bos);
            oos.writeObject(geometry);
            oos.flush();
            oos.close();
            bos.close();
            ByteArrayInputStream bais = new ByteArrayInputStream(bos.toByteArray());
            Geometry geom = (Geometry) new ObjectInputStream(bais).readObject();
            bais.close();
            return geom;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean isMutable() {
        return true;
    }

    @Override
    public Serializable disassemble(Geometry o) throws HibernateException {
        return o;
    }

    @Override
    public Geometry assemble(Serializable serializable, Object o) throws HibernateException {
        return deepCopy((Geometry) serializable);
    }

    @Override
    public Geometry replace(Geometry o, Geometry o1, Object o2) throws HibernateException {
        return deepCopy(o);
    }

}
