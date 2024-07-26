package com.example.vehicle.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String merek;

    private String model;

    private String year;

    private String color;

    private Integer price;

    private String image;
    
    public Car() {
    }

    public Car(String merek, String model, String year, String color, Integer price, String image) {
        this.merek = merek;
        this.model = model;
        this.year = year;
        this.color = color;
        this.price = price;
        this.image = image;
    }

    public Long getId() {
        return id;
    }

    public String getMerek() {
        return merek;
    }

    public String getModel() {
        return model;
    }

    public String getYear() {
        return year;
    }

    public String getColor() {
        return color;
    }

    public Integer getPrice() {
        return price;
    }

    public String getImage(){
        return image;
    }

    
}
