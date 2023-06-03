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

        while (iter.hasNext()) {
            Partner partner = iter.next();

            if (clientAddressPoint.within(partner.getCoverageArea())) {
                // calculating the distance between the points 
                double distance = clientAddressPoint.distance(partner.getAddress());
                bestPartners.put(partner, distance);
            }
        }
        //sorting
        List<Partner> sortedBestPartners = bestPartners.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue(Comparator.naturalOrder()))
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
        
        return sortedBestPartners;
    }
}
