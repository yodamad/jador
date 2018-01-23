package fr.jador.repository;

import fr.jador.domain.Vente;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Vente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VenteRepository extends JpaRepository<Vente, Long> {

}
