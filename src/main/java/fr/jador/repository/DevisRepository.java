package fr.jador.repository;

import fr.jador.domain.Devis;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Devis entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DevisRepository extends JpaRepository<Devis, Long> {

}
