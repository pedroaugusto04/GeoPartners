/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pedro.geoPartners.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.pedro.geoPartners.model.Partner;
import com.pedro.geoPartners.repository.PartnerRepository;
import java.io.IOException;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import org.locationtech.jts.geom.Geometry;
import org.springframework.stereotype.Service;

/**
 *
 * @author pedro
 */
@Service
public class PartnerServiceImpl implements PartnerService {

    private PartnerRepository partnerRepository;

    public PartnerServiceImpl(PartnerRepository partnerRepository) {
        this.partnerRepository = partnerRepository;
    }

    @Override
    public Partner savePartner(Partner partner) throws JsonProcessingException {
        System.out.println(partner.getCoverageArea());
        return partnerRepository.save(partner);
    }

    @Override
    public Partner getPartnerById(UUID id) {
        return partnerRepository.findById(id).orElseThrow( /* id not found */);
    }

    @Override
    public List<Partner> getPartners() {
        return partnerRepository.findAll();
    }
    
    public void deletePartner(String document){
        System.out.println(document);
        partnerRepository.delete(partnerRepository.findByDocument(document).orElseThrow()); // partner not found
    }

    @Override
    public Partner updatePartner(Partner partner) throws JsonProcessingException {
        Partner partnerToUpdate = partnerRepository.findByDocument(partner.getDocument()).orElseThrow(); /*partner not found */
        partnerToUpdate.setAddress(partner.getAddress());
        partnerToUpdate.setCoverageArea(partner.getCoverageArea());
        partnerToUpdate.setOwnerName(partner.getOwnerName());
        partnerToUpdate.setTradingName(partner.getTradingName());
        return savePartner(partnerToUpdate);
    }

    @Override
    public List<Partner> searchBestPartners(Geometry clientAddressPoint) throws IOException {
        List<Partner> listPartners = partnerRepository.findAll();
        Iterator<Partner> iter = listPartners.iterator();

        Map<Partner, Double> bestPartners = new HashMap<Partner, Double>();

        // formatting to haversine
        String clientAddressFormat = formatJson(clientAddressPoint.toString());
        double clientAddressArray[] = jsonToDoubleArray(clientAddressFormat);

        while (iter.hasNext()) {
            Partner partner = iter.next();

            //formatting to haversine
            String partnerAddressFormat = formatJson(partner.getAddress().toString());
            double partnersAddressArrayDouble[] = jsonToDoubleArray(partnerAddressFormat);

            if (clientAddressPoint.within(partner.getCoverageArea())) {
                // calculating the shortest distance between the points (haversine)
                double haversineResult = shorterDistanceKm(clientAddressArray[0], clientAddressArray[1], partnersAddressArrayDouble[0],
                        partnersAddressArrayDouble[1]);
                bestPartners.put(partner, haversineResult);
            }
        }
        //sorting
        List<Partner> sortedBestPartners = bestPartners.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        return sortedBestPartners;
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
