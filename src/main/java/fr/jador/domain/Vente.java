package fr.jador.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Vente.
 */
@Entity
@Table(name = "vente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Vente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private LocalDate date;

    @NotNull
    @Column(name = "prix", nullable = false)
    private Double prix;

    @Column(name = "promotion")
    private Double promotion;

    @Column(name = "poids")
    private Double poids;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Article article;

    @ManyToOne(optional = false)
    @NotNull
    private Client clientRef;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Vente date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getPrix() {
        return prix;
    }

    public Vente prix(Double prix) {
        this.prix = prix;
        return this;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public Double getPromotion() {
        return promotion;
    }

    public Vente promotion(Double promotion) {
        this.promotion = promotion;
        return this;
    }

    public void setPromotion(Double promotion) {
        this.promotion = promotion;
    }

    public Double getPoids() {
        return poids;
    }

    public Vente poids(Double poids) {
        this.poids = poids;
        return this;
    }

    public void setPoids(Double poids) {
        this.poids = poids;
    }

    public Article getArticle() {
        return article;
    }

    public Vente article(Article article) {
        this.article = article;
        return this;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public Client getClientRef() {
        return clientRef;
    }

    public Vente clientRef(Client client) {
        this.clientRef = client;
        return this;
    }

    public void setClientRef(Client client) {
        this.clientRef = client;
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
        Vente vente = (Vente) o;
        if (vente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Vente{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", prix=" + getPrix() +
            ", promotion=" + getPromotion() +
            ", poids=" + getPoids() +
            "}";
    }
}
