package fr.jador.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.jador.service.VenteService;
import fr.jador.web.rest.errors.BadRequestAlertException;
import fr.jador.web.rest.util.HeaderUtil;
import fr.jador.web.rest.util.PaginationUtil;
import fr.jador.service.dto.VenteDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Vente.
 */
@RestController
@RequestMapping("/api")
public class VenteResource {

    private final Logger log = LoggerFactory.getLogger(VenteResource.class);

    private static final String ENTITY_NAME = "vente";

    private final VenteService venteService;

    public VenteResource(VenteService venteService) {
        this.venteService = venteService;
    }

    /**
     * POST  /ventes : Create a new vente.
     *
     * @param venteDTO the venteDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new venteDTO, or with status 400 (Bad Request) if the vente has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/ventes")
    @Timed
    public ResponseEntity<VenteDTO> createVente(@Valid @RequestBody VenteDTO venteDTO) throws URISyntaxException {
        log.debug("REST request to save Vente : {}", venteDTO);
        if (venteDTO.getId() != null) {
            throw new BadRequestAlertException("A new vente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VenteDTO result = venteService.save(venteDTO);
        return ResponseEntity.created(new URI("/api/ventes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /ventes : Updates an existing vente.
     *
     * @param venteDTO the venteDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated venteDTO,
     * or with status 400 (Bad Request) if the venteDTO is not valid,
     * or with status 500 (Internal Server Error) if the venteDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/ventes")
    @Timed
    public ResponseEntity<VenteDTO> updateVente(@Valid @RequestBody VenteDTO venteDTO) throws URISyntaxException {
        log.debug("REST request to update Vente : {}", venteDTO);
        if (venteDTO.getId() == null) {
            return createVente(venteDTO);
        }
        VenteDTO result = venteService.save(venteDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, venteDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /ventes : get all the ventes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of ventes in body
     */
    @GetMapping("/ventes")
    @Timed
    public ResponseEntity<List<VenteDTO>> getAllVentes(Pageable pageable) {
        log.debug("REST request to get a page of Ventes");
        Page<VenteDTO> page = venteService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/ventes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /ventes/:id : get the "id" vente.
     *
     * @param id the id of the venteDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the venteDTO, or with status 404 (Not Found)
     */
    @GetMapping("/ventes/{id}")
    @Timed
    public ResponseEntity<VenteDTO> getVente(@PathVariable Long id) {
        log.debug("REST request to get Vente : {}", id);
        VenteDTO venteDTO = venteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(venteDTO));
    }

    /**
     * DELETE  /ventes/:id : delete the "id" vente.
     *
     * @param id the id of the venteDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/ventes/{id}")
    @Timed
    public ResponseEntity<Void> deleteVente(@PathVariable Long id) {
        log.debug("REST request to delete Vente : {}", id);
        venteService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
