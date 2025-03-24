package com.TermProject.finema.dto;

public class PasswordChangeRequest {
    private String email;
    private String newPassword;
    private String currentPassword;

    public String getEmail() {return this.email;}
    public void setEmail(String email) {this.email = email;}
    public String getNewPassword() {return this.newPassword;}
    public void setNewPassword(String newPassword) {this.newPassword = newPassword;}
    public String getCurrentPassword() {return this.currentPassword;}
    public void setCurrentPassword(String currentPassword) {this.currentPassword = currentPassword;}
}
