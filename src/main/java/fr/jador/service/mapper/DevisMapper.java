package fr.jador.service.mapper;

import fr.jador.domain.*;
import fr.jador.service.dto.DevisDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Devis and its DTO DevisDTO.
 */
@Mapper(componentModel = "spring", uses = {ArticleMapper.class, FournisseurMapper.class})
public interface DevisMapper extends EntityMapper<DevisDTO, Devis> {

    @Mapping(source = "article.id", target = "articleId")
    @Mapping(source = "fournisseurRef.id", target = "fournisseurRefId")
    DevisDTO toDto(Devis devis); 

    @Mapping(source = "articleId", target = "article")
    @Mapping(source = "fournisseurRefId", target = "fournisseurRef")
    Devis toEntity(DevisDTO devisDTO);

    default Devis fromId(Long id) {
        if (id == null) {
            return null;
        }
        Devis devis = new Devis();
        devis.setId(id);
        return devis;
    }
}
