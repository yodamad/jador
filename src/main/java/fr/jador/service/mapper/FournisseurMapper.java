package fr.jador.service.mapper;

import fr.jador.domain.*;
import fr.jador.service.dto.FournisseurDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Fournisseur and its DTO FournisseurDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface FournisseurMapper extends EntityMapper<FournisseurDTO, Fournisseur> {


    @Mapping(target = "devis", ignore = true)
    Fournisseur toEntity(FournisseurDTO fournisseurDTO);

    default Fournisseur fromId(Long id) {
        if (id == null) {
            return null;
        }
        Fournisseur fournisseur = new Fournisseur();
        fournisseur.setId(id);
        return fournisseur;
    }
}
