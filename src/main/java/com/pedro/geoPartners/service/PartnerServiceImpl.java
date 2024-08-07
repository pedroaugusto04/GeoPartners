/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pedro.geoPartners.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.pedro.geoPartners.exceptions.PartnerNotFoundException;
import com.pedro.geoPartners.model.Partner;
import com.pedro.geoPartners.repository.PartnerRepository;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
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
    @Transactional
    public Partner savePartner(Partner partner) throws JsonProcessingException, SQLException {
        return partnerRepository.save(partner);
    }

    @Override
    @Transactional
    public List<Partner> getPartners() {
        return partnerRepository.findAll();
    }

    @Override
    @Transactional
    public void deletePartner(String document) throws PartnerNotFoundException {
        partnerRepository.delete(partnerRepository.findByDocument(document)
                .orElseThrow(() -> new PartnerNotFoundException("Partner not found")));
    }

    @Override
    @Transactional
    public Partner updatePartner(Partner partner, String document)
            throws JsonProcessingException, PartnerNotFoundException, SQLException {
        Partner partnerToUpdate = partnerRepository.findByDocument(document)
                .orElseThrow(() -> new PartnerNotFoundException("Partner not found"));
        partnerToUpdate.setAddress(partner.getAddress());
        partnerToUpdate.setCoverageArea(partner.getCoverageArea());
        partnerToUpdate.setOwnerName(partner.getOwnerName());
        partnerToUpdate.setTradingName(partner.getTradingName());
        return partnerRepository.save(partnerToUpdate);
    }

    @Override
    @Transactional
    public List<Partner> searchBestPartners(Geometry clientAddressPoint, Geometry clientCoverageArea) throws IOException {
        List<Partner> listPartners = partnerRepository.findAll();
        List<Partner> bestPartners = new ArrayList<>(listPartners.size());
        listPartners.forEach(partner -> {
            if (clientAddressPoint.within(partner.getCoverageArea())
                    && partner.getAddress().within(clientCoverageArea)) {

                bestPartners.add(partner);
            }
        });
        return bestPartners;
    }
}
