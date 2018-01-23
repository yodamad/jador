package fr.jador.service.mapper;

import fr.jador.domain.*;
import fr.jador.service.dto.VenteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Vente and its DTO VenteDTO.
 */
@Mapper(componentModel = "spring", uses = {ArticleMapper.class, ClientMapper.class})
public interface VenteMapper extends EntityMapper<VenteDTO, Vente> {

    @Mapping(source = "article.id", target = "articleId")
    @Mapping(source = "clientRef.id", target = "clientRefId")
    VenteDTO toDto(Vente vente);

    @Mapping(source = "articleId", target = "article")
    @Mapping(source = "clientRefId", target = "clientRef")
    Vente toEntity(VenteDTO venteDTO);

    default Vente fromId(Long id) {
        if (id == null) {
            return null;
        }
        Vente vente = new Vente();
        vente.setId(id);
        return vente;
    }
}
