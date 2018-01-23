package fr.jador.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Fournisseur entity.
 */
public class FournisseurDTO implements Serializable {

    private Long id;

    @NotNull
    private String nom;

    @NotNull
    private String telephone;

    private String email;

    private String fax;

    private String adresse;

    private Integer codePostal;

    @NotNull
    private String ville;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Integer getCodePostal() {
        return codePostal;
    }

    public void setCodePostal(Integer codePostal) {
        this.codePostal = codePostal;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        FournisseurDTO fournisseurDTO = (FournisseurDTO) o;
        if(fournisseurDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fournisseurDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FournisseurDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", email='" + getEmail() + "'" +
            ", fax='" + getFax() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", codePostal=" + getCodePostal() +
            ", ville='" + getVille() + "'" +
            "}";
    }
}
