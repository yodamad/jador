package fr.jador.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Vente entity.
 */
public class VenteDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate date;

    @NotNull
    private Double prix;

    private Double promotion;

    private Double poids;

    private Long articleId;

    private Long clientRefId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getPrix() {
        return prix;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public Double getPromotion() {
        return promotion;
    }

    public void setPromotion(Double promotion) {
        this.promotion = promotion;
    }

    public Double getPoids() {
        return poids;
    }

    public void setPoids(Double poids) {
        this.poids = poids;
    }

    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }

    public Long getClientRefId() {
        return clientRefId;
    }

    public void setClientRefId(Long clientId) {
        this.clientRefId = clientId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VenteDTO venteDTO = (VenteDTO) o;
        if(venteDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), venteDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VenteDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", prix=" + getPrix() +
            ", promotion=" + getPromotion() +
            ", poids=" + getPoids() +
            "}";
    }
}
