/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pedro.geoPartners.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.pedro.geoPartners.model.Partner;
import com.pedro.geoPartners.service.PartnerService;
import java.io.IOException;
import java.util.List;
import org.locationtech.jts.geom.Geometry;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author pedro
 */
@Controller
@RequestMapping("/geopartners")
public class PartnerController {

    private PartnerService partnerService;

    public PartnerController(PartnerService partnerService) {
        this.partnerService = partnerService;
    }

    @RequestMapping("/")
    public String home() {
        return "home";
    }

    @RequestMapping("/register")
    public String registerPage() {
        return "register";
    }

    @RequestMapping("/update")
    public String updatePage() {
        return "update";
    }

    @RequestMapping("/delete")
    public String deletePage() {
        return "delete";
    }

    @RequestMapping("/search")
    public String searchPage() {
        return "search";
    }

    @RequestMapping("/partners")
    public String partnersPage() {
        return "partners";
    }

    @PostMapping("/logic/register")
    @ResponseBody
    public ResponseEntity<String> registerLogic(@RequestBody Partner partner) throws JsonProcessingException {
        partnerService.savePartner(partner);
        return ResponseEntity.ok("Partner successfully created!");
    }

    @PostMapping("/logic/update")
    public ResponseEntity<String> updateLogic(@RequestBody Partner partner) throws JsonProcessingException {
        partnerService.updatePartner(partner);
        return ResponseEntity.ok("Partner successfully updated!");
    }

    @RequestMapping("/logic/delete")
    public ResponseEntity<String> deleteLogic(@RequestBody String document) {
        partnerService.deletePartner(document);
        return ResponseEntity.ok("Partner sucessfully deleted!");
    }

    @PutMapping("/logic/search")
    @ResponseBody
    public List<Partner> searchLogic(Geometry clientAddress) throws IOException {
        return partnerService.searchBestPartners(clientAddress);
    }

    @RequestMapping("/logic/partners")
    @ResponseBody
    public List<Partner> partnersLogic() {
        return partnerService.getPartners();
    }
}
