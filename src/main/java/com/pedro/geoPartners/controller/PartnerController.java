/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pedro.geoPartners.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.pedro.geoPartners.dto.GeometriesDTO;
import com.pedro.geoPartners.exceptions.PartnerNotFoundException;
import com.pedro.geoPartners.model.Partner;
import com.pedro.geoPartners.service.PartnerService;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author pedro
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/geopartners")
public class PartnerController {

    private PartnerService partnerService;

    public PartnerController(PartnerService partnerService) {
        this.partnerService = partnerService;
    }

    @PostMapping("/logic/register")
    @ResponseBody
    public Partner registerLogic(@RequestBody Partner partner) throws JsonProcessingException, SQLException {
        return partnerService.savePartner(partner);

    }

    @PutMapping("/logic/update/{document}")
    public Partner updateLogic(@RequestBody Partner partner, @PathVariable String document)
            throws JsonProcessingException, PartnerNotFoundException, SQLException {
        return partnerService.updatePartner(partner, document);
    }

    @DeleteMapping("/logic/delete/{document}")
    public ResponseEntity<String> deleteLogic(@PathVariable String document) throws PartnerNotFoundException {
        partnerService.deletePartner(document);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/logic/search")
    @ResponseBody
    public List<Partner> searchLogic(@RequestBody GeometriesDTO geometries) throws IOException {
        return partnerService.searchBestPartners(geometries.getAddress(),geometries.getCoverageArea());
    }

    @RequestMapping("/logic/partners")
    @ResponseBody
    public ResponseEntity<List<Partner>> partnersLogic() {
        return ResponseEntity.ok(partnerService.getPartners());
    }
}
