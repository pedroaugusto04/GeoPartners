/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.pedro.geoPartners.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.pedro.geoPartners.exceptions.PartnerNotFoundException;
import com.pedro.geoPartners.model.Partner;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import org.locationtech.jts.geom.Geometry;

/**
 *
 * @author pedro
 */
public interface PartnerService {
    
    public Partner savePartner(Partner partner) throws JsonProcessingException, SQLException;
    
    public List<Partner> getPartners();
    
    public List<Partner> searchBestPartners(Geometry clientAddress) throws IOException;
   
    public Partner updatePartner(Partner partner) throws JsonProcessingException,PartnerNotFoundException, SQLException;
    
    public void deletePartner(String document) throws PartnerNotFoundException;
    
}
