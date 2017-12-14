package fr.jador.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Devis.
 */
@Entity
@Table(name = "devis")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Devis implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private LocalDate date;

    @Column(name = "retour")
    private LocalDate retour;

    @NotNull
    @Column(name = "prix", nullable = false)
    private Double prix;

    @Column(name = "cout")
    private Double cout;

    @Column(name = "jhi_validation")
    private Boolean validation;

    @Column(name = "poids")
    private Double poids;

    @Column(name = "num_ticket")
    private String numTicket;

    @Column(name = "details")
    private String details;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Article article;

    @ManyToOne
    private Fournisseur fournisseurRef;

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

    public Devis date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getRetour() {
        return retour;
    }

    public Devis retour(LocalDate retour) {
        this.retour = retour;
        return this;
    }

    public void setRetour(LocalDate retour) {
        this.retour = retour;
    }

    public Double getPrix() {
        return prix;
    }

    public Devis prix(Double prix) {
        this.prix = prix;
        return this;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }

    public Double getCout() {
        return cout;
    }

    public Devis cout(Double cout) {
        this.cout = cout;
        return this;
    }

    public void setCout(Double cout) {
        this.cout = cout;
    }

    public Boolean isValidation() {
        return validation;
    }

    public Devis validation(Boolean validation) {
        this.validation = validation;
        return this;
    }

    public void setValidation(Boolean validation) {
        this.validation = validation;
    }

    public Double getPoids() {
        return poids;
    }

    public Devis poids(Double poids) {
        this.poids = poids;
        return this;
    }

    public void setPoids(Double poids) {
        this.poids = poids;
    }

    public String getNumTicket() {
        return numTicket;
    }

    public Devis numTicket(String numTicket) {
        this.numTicket = numTicket;
        return this;
    }

    public void setNumTicket(String numTicket) {
        this.numTicket = numTicket;
    }

    public String getDetails() {
        return details;
    }

    public Devis details(String details) {
        this.details = details;
        return this;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Article getArticle() {
        return article;
    }

    public Devis article(Article article) {
        this.article = article;
        return this;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public Fournisseur getFournisseurRef() {
        return fournisseurRef;
    }

    public Devis fournisseurRef(Fournisseur fournisseur) {
        this.fournisseurRef = fournisseur;
        return this;
    }

    public void setFournisseurRef(Fournisseur fournisseur) {
        this.fournisseurRef = fournisseur;
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
        Devis devis = (Devis) o;
        if (devis.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), devis.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Devis{" +
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
