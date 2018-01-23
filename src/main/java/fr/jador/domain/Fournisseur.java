package fr.jador.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Fournisseur.
 */
@Entity
@Table(name = "fournisseur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Fournisseur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "telephone", nullable = false)
    private String telephone;

    @Column(name = "email")
    private String email;

    @Column(name = "fax")
    private String fax;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "code_postal")
    private Integer codePostal;

    @NotNull
    @Column(name = "ville", nullable = false)
    private String ville;

    @OneToMany(mappedBy = "fournisseurRef")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Devis> devis = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Fournisseur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getTelephone() {
        return telephone;
    }

    public Fournisseur telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public Fournisseur email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFax() {
        return fax;
    }

    public Fournisseur fax(String fax) {
        this.fax = fax;
        return this;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getAdresse() {
        return adresse;
    }

    public Fournisseur adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Integer getCodePostal() {
        return codePostal;
    }

    public Fournisseur codePostal(Integer codePostal) {
        this.codePostal = codePostal;
        return this;
    }

    public void setCodePostal(Integer codePostal) {
        this.codePostal = codePostal;
    }

    public String getVille() {
        return ville;
    }

    public Fournisseur ville(String ville) {
        this.ville = ville;
        return this;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public Set<Devis> getDevis() {
        return devis;
    }

    public Fournisseur devis(Set<Devis> devis) {
        this.devis = devis;
        return this;
    }

    public Fournisseur addDevis(Devis devis) {
        this.devis.add(devis);
        devis.setFournisseurRef(this);
        return this;
    }

    public Fournisseur removeDevis(Devis devis) {
        this.devis.remove(devis);
        devis.setFournisseurRef(null);
        return this;
    }

    public void setDevis(Set<Devis> devis) {
        this.devis = devis;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Fournisseur fournisseur = (Fournisseur) o;
        if (fournisseur.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fournisseur.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Fournisseur{" +
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
