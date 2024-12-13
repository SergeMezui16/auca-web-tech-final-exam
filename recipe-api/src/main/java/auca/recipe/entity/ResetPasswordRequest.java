package auca.recipe.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class ResetPasswordRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Temporal(TemporalType.TIMESTAMP)
    private Date requestedAt;

    private String token;

    @Temporal(TemporalType.TIMESTAMP)
    private Date expiresAt;

    public ResetPasswordRequest() {

    }

    public ResetPasswordRequest(User user, String token) {
        this.user = user;
        this.token = token;
        this.requestedAt = new Date();
        this.expiresAt = new Date(System.currentTimeMillis() + 1000 * 60 * 60);
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getRequestedAt() {
        return requestedAt;
    }

    public void setRequestedAt(Date requestedAt) {
        this.requestedAt = requestedAt;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(Date expiresAt) {
        this.expiresAt = expiresAt;
    }
}
