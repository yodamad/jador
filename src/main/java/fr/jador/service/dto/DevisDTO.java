package fr.jador.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Devis entity.
 */
public class DevisDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate date;

    private LocalDate retour;

    @NotNull
    private Double prix;

    private Double cout;

    private Boolean validation;

    private Double poids;

    private String numTicket;

    private String details;

    private Long articleId;

    private Long fournisseurRefId;

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

    public LocalDate getRetour() {
        return retour;
    }

    public void setRetour(LocalDate retour) {
        this.retour = retour;
    }

    public Double getPrix() {
        return prix;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public Double getCout() {
        return cout;
    }

    public void setCout(Double cout) {
        this.cout = cout;
    }

    public Boolean isValidation() {
        return validation;
    }

    public void setValidation(Boolean validation) {
        this.validation = validation;
    }

    public Double getPoids() {
        return poids;
    }

    public void setPoids(Double poids) {
        this.poids = poids;
    }

    public String getNumTicket() {
        return numTicket;
    }

    public void setNumTicket(String numTicket) {
        this.numTicket = numTicket;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }

    public Long getFournisseurRefId() {
        return fournisseurRefId;
    }

    public void setFournisseurRefId(Long fournisseurId) {
        this.fournisseurRefId = fournisseurId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DevisDTO devisDTO = (DevisDTO) o;
        if(devisDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), devisDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DevisDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", retour='" + getRetour() + "'" +
            ", prix=" + getPrix() +
            ", cout=" + getCout() +
            ", validation='" + isValidation() + "'" +
            ", poids=" + getPoids() +
            ", numTicket='" + getNumTicket() + "'" +
            ", details='" + getDetails() + "'" +
            "}";
    }
}
