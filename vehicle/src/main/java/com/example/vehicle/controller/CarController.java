package com.example.vehicle.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vehicle.model.Car;
import com.example.vehicle.repository.CarRepository;


@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/cars")
@RestController
public class CarController {
    
    private final CarRepository carRepository;

    @Autowired
    public CarController(CarRepository carRepository) {
        this.carRepository = carRepository;
    }

    @RequestMapping
    public List <Car> getCars() {
        return carRepository.findAll();
    }

    @PostMapping
    public Car createCar(@RequestBody Car car) {
        return carRepository.save(car);
    }

    @PutMapping
    public String updateCar(@RequestBody Car car) {
        carRepository.save(car);
        return "Car Berhasil Di Perbarui";
    }

    @DeleteMapping("{id}")
    public String deleteById(@PathVariable Long id){
        carRepository.deleteById(id);
        return "Car Berhasil Di hapus";
    }
}
