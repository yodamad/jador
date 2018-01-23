package fr.jador.service;

import fr.jador.domain.Article;
import fr.jador.repository.ArticleRepository;
import fr.jador.service.dto.ArticleDTO;
import fr.jador.service.mapper.ArticleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Article.
 */
@Service
@Transactional
public class ArticleService {

    private final Logger log = LoggerFactory.getLogger(ArticleService.class);

    private final ArticleRepository articleRepository;

    private final ArticleMapper articleMapper;

    public ArticleService(ArticleRepository articleRepository, ArticleMapper articleMapper) {
        this.articleRepository = articleRepository;
        this.articleMapper = articleMapper;
    }

    /**
     * Save a article.
     *
     * @param articleDTO the entity to save
     * @return the persisted entity
     */
    public ArticleDTO save(ArticleDTO articleDTO) {
        log.debug("Request to save Article : {}", articleDTO);
        Article article = articleMapper.toEntity(articleDTO);
        article = articleRepository.save(article);
        return articleMapper.toDto(article);
    }

    /**
     * Get all the articles.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ArticleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Articles");
        return articleRepository.findAll(pageable)
            .map(articleMapper::toDto);
    }

    /**
     * Get one article by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public ArticleDTO findOne(Long id) {
        log.debug("Request to get Article : {}", id);
        Article article = articleRepository.findOne(id);
        return articleMapper.toDto(article);
    }

    /**
     * Delete the article by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Article : {}", id);
        articleRepository.delete(id);
    }
}
