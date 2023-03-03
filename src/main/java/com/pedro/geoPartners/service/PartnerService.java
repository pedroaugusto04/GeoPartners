/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pedro.geoPartners.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.pedro.geoPartners.model.Partner;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import org.locationtech.jts.geom.Geometry;

/**
 *
 * @author pedro
 */
public interface PartnerService {
    
    public Partner savePartner(Partner partner) throws JsonProcessingException;
    
    public Partner getPartnerById(UUID id);
    
    public List<Partner> getPartners();
    
    public List<Partner> searchBestPartners(Geometry clientAddress) throws IOException;
    
}
