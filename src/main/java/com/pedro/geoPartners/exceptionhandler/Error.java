/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.pedro.geoPartners.exceptionhandler;

/**
 *
 * @author pedro
 */
import com.fasterxml.jackson.annotation.JsonInclude;

/**
 *
 * @author pedro
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Error {

    private Integer status;
    private String description;

    public void setStatus(Integer status) {
        this.status = status;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public Integer getStatus() {
        return status;
    }

    public String getDescription() {
        return description;
    }
}
