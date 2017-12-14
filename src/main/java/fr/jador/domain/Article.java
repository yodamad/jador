package fr.jador.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "reference", nullable = false)
    private String reference;

    @Column(name = "marque")
    private String marque;

    @Column(name = "metal")
    private String metal;

    @Column(name = "stock")
    private Integer stock;

    @NotNull
    @Column(name = "prix_achat", nullable = false)
    private Double prixAchat;

    @Column(name = "poids")
    private Double poids;

    @Column(name = "date_achat")
    private LocalDate dateAchat;

    @Column(name = "livre_police")
    private String livrePolice;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public Article reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getMarque() {
        return marque;
    }

    public Article marque(String marque) {
        this.marque = marque;
        return this;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public String getMetal() {
        return metal;
    }

    public Article metal(String metal) {
        this.metal = metal;
        return this;
    }

    public void setMetal(String metal) {
        this.metal = metal;
    }

    public Integer getStock() {
        return stock;
    }

    public Article stock(Integer stock) {
        this.stock = stock;
        return this;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Double getPrixAchat() {
        return prixAchat;
    }

    public Article prixAchat(Double prixAchat) {
        this.prixAchat = prixAchat;
        return this;
    }

    public void setPrixAchat(Double prixAchat) {
        this.prixAchat = prixAchat;
    }

    public Double getPoids() {
        return poids;
    }

    public Article poids(Double poids) {
        this.poids = poids;
        return this;
    }

    public void setPoids(Double poids) {
        this.poids = poids;
    }

    public LocalDate getDateAchat() {
        return dateAchat;
    }

    public Article dateAchat(LocalDate dateAchat) {
        this.dateAchat = dateAchat;
        return this;
    }

    public void setDateAchat(LocalDate dateAchat) {
        this.dateAchat = dateAchat;
    }

    public String getLivrePolice() {
        return livrePolice;
    }

    public Article livrePolice(String livrePolice) {
        this.livrePolice = livrePolice;
        return this;
    }

    public void setLivrePolice(String livrePolice) {
        this.livrePolice = livrePolice;
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
        Article article = (Article) o;
        if (article.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), article.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", reference='" + getReference() + "'" +
            ", marque='" + getMarque() + "'" +
            ", metal='" + getMetal() + "'" +
            ", stock=" + getStock() +
            ", prixAchat=" + getPrixAchat() +
            ", poids=" + getPoids() +
            ", dateAchat='" + getDateAchat() + "'" +
            ", livrePolice='" + getLivrePolice() + "'" +
            "}";
    }
}
