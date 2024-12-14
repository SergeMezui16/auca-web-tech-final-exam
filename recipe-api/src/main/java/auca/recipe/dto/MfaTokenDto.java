package auca.recipe.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

public class MfaTokenDto {
    private String code;

    public MfaTokenDto(String code) {
        this.code = code;
    }

    @JsonInclude
    public String getUrl() {
        return "otpauth://totp/MFA?secret=" + code + "&issuer=RecipeHub" + "&algorithm=SHA256&digits=6&period=30";
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
