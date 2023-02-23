/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pedro.geoPartners.repository;

import com.pedro.geoPartners.model.Partner;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author pedro
 */

@Repository
public interface PartnerRepository extends JpaRepository<Partner, UUID> {
    
    
    @Override
    public Optional<Partner> findById(UUID id);
}
