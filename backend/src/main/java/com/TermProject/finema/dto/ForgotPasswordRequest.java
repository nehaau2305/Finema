package com.TermProject.finema.dto;

public class ForgotPasswordRequest {
    private String token;
    private String password;

    public String getToken() {return this.token;}
    public void setToken(String token) {this.token = token;}
    public String getpassword() {return this.password;}
    public void setpassword(String password) {this.password = password;}
}
