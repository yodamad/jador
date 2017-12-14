package fr.jador.web.rest;

import fr.jador.JadorApp;

import fr.jador.domain.Vente;
import fr.jador.domain.Article;
import fr.jador.domain.Client;
import fr.jador.repository.VenteRepository;
import fr.jador.service.VenteService;
import fr.jador.service.dto.VenteDTO;
import fr.jador.service.mapper.VenteMapper;
import fr.jador.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static fr.jador.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the VenteResource REST controller.
 *
 * @see VenteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JadorApp.class)
public class VenteResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_PRIX = 1D;
    private static final Double UPDATED_PRIX = 2D;

    private static final Double DEFAULT_PROMOTION = 1D;
    private static final Double UPDATED_PROMOTION = 2D;

    private static final Double DEFAULT_POIDS = 1D;
    private static final Double UPDATED_POIDS = 2D;

    @Autowired
    private VenteRepository venteRepository;

    @Autowired
    private VenteMapper venteMapper;

    @Autowired
    private VenteService venteService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVenteMockMvc;

    private Vente vente;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VenteResource venteResource = new VenteResource(venteService);
        this.restVenteMockMvc = MockMvcBuilders.standaloneSetup(venteResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vente createEntity(EntityManager em) {
        Vente vente = new Vente()
            .date(DEFAULT_DATE)
            .prix(DEFAULT_PRIX)
            .promotion(DEFAULT_PROMOTION)
            .poids(DEFAULT_POIDS);
        // Add required entity
        Article article = ArticleResourceIntTest.createEntity(em);
        em.persist(article);
        em.flush();
        vente.setArticle(article);
        // Add required entity
        Client clientRef = ClientResourceIntTest.createEntity(em);
        em.persist(clientRef);
        em.flush();
        vente.setClientRef(clientRef);
        return vente;
    }

    @Before
    public void initTest() {
        vente = createEntity(em);
    }

    @Test
    @Transactional
    public void createVente() throws Exception {
        int databaseSizeBeforeCreate = venteRepository.findAll().size();

        // Create the Vente
        VenteDTO venteDTO = venteMapper.toDto(vente);
        restVenteMockMvc.perform(post("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(venteDTO)))
            .andExpect(status().isCreated());

        // Validate the Vente in the database
        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeCreate + 1);
        Vente testVente = venteList.get(venteList.size() - 1);
        assertThat(testVente.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testVente.getPrix()).isEqualTo(DEFAULT_PRIX);
        assertThat(testVente.getPromotion()).isEqualTo(DEFAULT_PROMOTION);
        assertThat(testVente.getPoids()).isEqualTo(DEFAULT_POIDS);
    }

    @Test
    @Transactional
    public void createVenteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = venteRepository.findAll().size();

        // Create the Vente with an existing ID
        vente.setId(1L);
        VenteDTO venteDTO = venteMapper.toDto(vente);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVenteMockMvc.perform(post("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(venteDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Vente in the database
        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = venteRepository.findAll().size();
        // set the field null
        vente.setDate(null);

        // Create the Vente, which fails.
        VenteDTO venteDTO = venteMapper.toDto(vente);

        restVenteMockMvc.perform(post("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(venteDTO)))
            .andExpect(status().isBadRequest());

        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrixIsRequired() throws Exception {
        int databaseSizeBeforeTest = venteRepository.findAll().size();
        // set the field null
        vente.setPrix(null);

        // Create the Vente, which fails.
        VenteDTO venteDTO = venteMapper.toDto(vente);

        restVenteMockMvc.perform(post("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(venteDTO)))
            .andExpect(status().isBadRequest());

        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVentes() throws Exception {
        // Initialize the database
        venteRepository.saveAndFlush(vente);

        // Get all the venteList
        restVenteMockMvc.perform(get("/api/ventes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vente.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].prix").value(hasItem(DEFAULT_PRIX.doubleValue())))
            .andExpect(jsonPath("$.[*].promotion").value(hasItem(DEFAULT_PROMOTION.doubleValue())))
            .andExpect(jsonPath("$.[*].poids").value(hasItem(DEFAULT_POIDS.doubleValue())));
    }

    @Test
    @Transactional
    public void getVente() throws Exception {
        // Initialize the database
        venteRepository.saveAndFlush(vente);

        // Get the vente
        restVenteMockMvc.perform(get("/api/ventes/{id}", vente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vente.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.prix").value(DEFAULT_PRIX.doubleValue()))
            .andExpect(jsonPath("$.promotion").value(DEFAULT_PROMOTION.doubleValue()))
            .andExpect(jsonPath("$.poids").value(DEFAULT_POIDS.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingVente() throws Exception {
        // Get the vente
        restVenteMockMvc.perform(get("/api/ventes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVente() throws Exception {
        // Initialize the database
        venteRepository.saveAndFlush(vente);
        int databaseSizeBeforeUpdate = venteRepository.findAll().size();

        // Update the vente
        Vente updatedVente = venteRepository.findOne(vente.getId());
        // Disconnect from session so that the updates on updatedVente are not directly saved in db
        em.detach(updatedVente);
        updatedVente
            .date(UPDATED_DATE)
            .prix(UPDATED_PRIX)
            .promotion(UPDATED_PROMOTION)
            .poids(UPDATED_POIDS);
        VenteDTO venteDTO = venteMapper.toDto(updatedVente);

        restVenteMockMvc.perform(put("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(venteDTO)))
            .andExpect(status().isOk());

        // Validate the Vente in the database
        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeUpdate);
        Vente testVente = venteList.get(venteList.size() - 1);
        assertThat(testVente.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testVente.getPrix()).isEqualTo(UPDATED_PRIX);
        assertThat(testVente.getPromotion()).isEqualTo(UPDATED_PROMOTION);
        assertThat(testVente.getPoids()).isEqualTo(UPDATED_POIDS);
    }

    @Test
    @Transactional
    public void updateNonExistingVente() throws Exception {
        int databaseSizeBeforeUpdate = venteRepository.findAll().size();

        // Create the Vente
        VenteDTO venteDTO = venteMapper.toDto(vente);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVenteMockMvc.perform(put("/api/ventes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(venteDTO)))
            .andExpect(status().isCreated());

        // Validate the Vente in the database
        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteVente() throws Exception {
        // Initialize the database
        venteRepository.saveAndFlush(vente);
        int databaseSizeBeforeDelete = venteRepository.findAll().size();

        // Get the vente
        restVenteMockMvc.perform(delete("/api/ventes/{id}", vente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Vente> venteList = venteRepository.findAll();
        assertThat(venteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vente.class);
        Vente vente1 = new Vente();
        vente1.setId(1L);
        Vente vente2 = new Vente();
        vente2.setId(vente1.getId());
        assertThat(vente1).isEqualTo(vente2);
        vente2.setId(2L);
        assertThat(vente1).isNotEqualTo(vente2);
        vente1.setId(null);
        assertThat(vente1).isNotEqualTo(vente2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(VenteDTO.class);
        VenteDTO venteDTO1 = new VenteDTO();
        venteDTO1.setId(1L);
        VenteDTO venteDTO2 = new VenteDTO();
        assertThat(venteDTO1).isNotEqualTo(venteDTO2);
        venteDTO2.setId(venteDTO1.getId());
        assertThat(venteDTO1).isEqualTo(venteDTO2);
        venteDTO2.setId(2L);
        assertThat(venteDTO1).isNotEqualTo(venteDTO2);
        venteDTO1.setId(null);
        assertThat(venteDTO1).isNotEqualTo(venteDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(venteMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(venteMapper.fromId(null)).isNull();
    }
}
