package fr.jador.service;

import fr.jador.domain.Fournisseur;
import fr.jador.repository.FournisseurRepository;
import fr.jador.service.dto.FournisseurDTO;
import fr.jador.service.mapper.FournisseurMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Fournisseur.
 */
@Service
@Transactional
public class FournisseurService {

    private final Logger log = LoggerFactory.getLogger(FournisseurService.class);

    private final FournisseurRepository fournisseurRepository;

    private final FournisseurMapper fournisseurMapper;

    public FournisseurService(FournisseurRepository fournisseurRepository, FournisseurMapper fournisseurMapper) {
        this.fournisseurRepository = fournisseurRepository;
        this.fournisseurMapper = fournisseurMapper;
    }

    /**
     * Save a fournisseur.
     *
     * @param fournisseurDTO the entity to save
     * @return the persisted entity
     */
    public FournisseurDTO save(FournisseurDTO fournisseurDTO) {
        log.debug("Request to save Fournisseur : {}", fournisseurDTO);
        Fournisseur fournisseur = fournisseurMapper.toEntity(fournisseurDTO);
        fournisseur = fournisseurRepository.save(fournisseur);
        return fournisseurMapper.toDto(fournisseur);
    }

    /**
     * Get all the fournisseurs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<FournisseurDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Fournisseurs");
        return fournisseurRepository.findAll(pageable)
            .map(fournisseurMapper::toDto);
    }

    /**
     * Get one fournisseur by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public FournisseurDTO findOne(Long id) {
        log.debug("Request to get Fournisseur : {}", id);
        Fournisseur fournisseur = fournisseurRepository.findOne(id);
        return fournisseurMapper.toDto(fournisseur);
    }

    /**
     * Delete the fournisseur by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Fournisseur : {}", id);
        fournisseurRepository.delete(id);
    }
}
