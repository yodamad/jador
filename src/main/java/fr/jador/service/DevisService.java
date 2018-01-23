package fr.jador.service;

import fr.jador.domain.Devis;
import fr.jador.repository.DevisRepository;
import fr.jador.service.dto.DevisDTO;
import fr.jador.service.mapper.DevisMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Devis.
 */
@Service
@Transactional
public class DevisService {

    private final Logger log = LoggerFactory.getLogger(DevisService.class);

    private final DevisRepository devisRepository;

    private final DevisMapper devisMapper;

    public DevisService(DevisRepository devisRepository, DevisMapper devisMapper) {
        this.devisRepository = devisRepository;
        this.devisMapper = devisMapper;
    }

    /**
     * Save a devis.
     *
     * @param devisDTO the entity to save
     * @return the persisted entity
     */
    public DevisDTO save(DevisDTO devisDTO) {
        log.debug("Request to save Devis : {}", devisDTO);
        Devis devis = devisMapper.toEntity(devisDTO);
        devis = devisRepository.save(devis);
        return devisMapper.toDto(devis);
    }

    /**
     * Get all the devis.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<DevisDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Devis");
        return devisRepository.findAll(pageable)
            .map(devisMapper::toDto);
    }

    /**
     * Get one devis by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public DevisDTO findOne(Long id) {
        log.debug("Request to get Devis : {}", id);
        Devis devis = devisRepository.findOne(id);
        return devisMapper.toDto(devis);
    }

    /**
     * Delete the devis by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Devis : {}", id);
        devisRepository.delete(id);
    }
}
