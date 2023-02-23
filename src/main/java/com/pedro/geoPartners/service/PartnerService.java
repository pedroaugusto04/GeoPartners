/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pedro.geoPartners.service;

import com.pedro.geoPartners.model.Partner;
import com.pedro.geoPartners.repository.PartnerRepository;
import com.vividsolutions.jts.geom.MultiPolygon;
import com.vividsolutions.jts.geom.Point;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import org.geotools.geojson.geom.GeometryJSON;
import org.springframework.stereotype.Service;

/**
 *
 * @author pedro
 */
@Service
public class PartnerService {

    private PartnerRepository partnerRepository;

    public Partner savePartner(Partner partner) {
        return partnerRepository.save(partner);
    }

    public Partner getPartnerById(UUID id) {
        return partnerRepository.findById(id).orElseThrow( /* id not found */);
    }

    public List<Partner> getPartners() throws ClassNotFoundException {

        return partnerRepository.findAll();
    }

    public Partner searchBestPartner(String clientAddress) throws IOException {
        List<Partner> listPartners = partnerRepository.findAll();
        Partner bestPartner = null;
        GeometryJSON geoJSON = new GeometryJSON();
        Iterator<Partner> iter = listPartners.iterator();
        double shorterDistance = Double.MAX_VALUE;

        Point clientAddressPoint = geoJSON.readPoint(clientAddress);

        clientAddress = formatJson(clientAddress);
        double clientAddressArray[] = jsonToDoubleArray(clientAddress);

        while (iter.hasNext()) {
            Partner partner = iter.next();
            MultiPolygon coverageArea = geoJSON.readMultiPolygon(partner.getCoverageArea());

            //formatting
            String partnerAddressFormat = formatJson(partner.getAddress());
            double partnersAddressArrayDouble[] = jsonToDoubleArray(partnerAddressFormat);

            if (clientAddressPoint.within(coverageArea)) {
                // calculating the shortest distance between the points (haversine)
                double haversineResult = shorterDistanceKm(clientAddressArray[0], clientAddressArray[1], partnersAddressArrayDouble[0],
                        partnersAddressArrayDouble[1]);
                if (shorterDistance > haversineResult) {
                    shorterDistance = haversineResult;
                    bestPartner = partner;
                }
            }
        }

        return bestPartner;
    }

    public static String formatJson(String json) {
        json = json.replaceAll("\\{", "");
        json = json.replaceAll("}", "");
        json = json.replaceAll("\\[", "");
        json = json.replaceAll("]", "");
        json = json.replaceAll("\".*?\":", "");
        return json;
    }

    public static double[] jsonToDoubleArray(String json) {
        String jsonArrayString[] = json.split(",");
        double jsonArrayDouble[] = new double[jsonArrayString.length];

        for (int i = 0; i < jsonArrayString.length; i++) {
            jsonArrayDouble[i] = Double.parseDouble(jsonArrayString[i]);
        }
        return jsonArrayDouble;
    }

    public static double shorterDistanceKm(double iniLong, double iniLat, double finLong, double finLat) {
        final int EARTH_RADIUS = 6371;
        double diffLong = Math.toRadians(finLong - iniLong);
        double diffLat = Math.toRadians(finLat - iniLat);

        double startLatRadius = Math.toRadians(iniLat);
        double endLatRadius = Math.toRadians(finLat);

        double a = Math.pow(Math.sin(diffLat / 2), 2) + Math.pow(Math.sin(diffLong / 2), 2) * Math.cos(startLatRadius) * Math.cos(endLatRadius);
        double c = 2 * Math.asin(Math.sqrt(a));

        return EARTH_RADIUS * c;
    }
}
