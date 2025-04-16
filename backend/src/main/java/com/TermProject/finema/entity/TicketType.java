package com.TermProject.finema.entity;

public enum TicketType {
    CHILD(8.00),
    ADULT(15.00),
    SENIOR(11.00);

    private double price;
    TicketType(double price) {
        this.price = price;
    }
    public double getPrice() {
        return price;
    }
}