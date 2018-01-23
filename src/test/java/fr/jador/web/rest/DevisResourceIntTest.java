package fr.jador.web.rest;

import fr.jador.JadorApp;

import fr.jador.domain.Devis;
import fr.jador.domain.Article;
import fr.jador.repository.DevisRepository;
import fr.jador.service.DevisService;
import fr.jador.service.dto.DevisDTO;
import fr.jador.service.mapper.DevisMapper;
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
 * Test class for the DevisResource REST controller.
 *
 * @see DevisResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JadorApp.class)
public class DevisResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_RETOUR = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_RETOUR = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_PRIX = 1D;
    private static final Double UPDATED_PRIX = 2D;

    private static final Double DEFAULT_COUT = 1D;
    private static final Double UPDATED_COUT = 2D;

    private static final Boolean DEFAULT_VALIDATION = false;
    private static final Boolean UPDATED_VALIDATION = true;

    private static final Double DEFAULT_POIDS = 1D;
    private static final Double UPDATED_POIDS = 2D;

    private static final String DEFAULT_NUM_TICKET = "AAAAAAAAAA";
    private static final String UPDATED_NUM_TICKET = "BBBBBBBBBB";

    private static final String DEFAULT_DETAILS = "AAAAAAAAAA";
    private static final String UPDATED_DETAILS = "BBBBBBBBBB";

    @Autowired
    private DevisRepository devisRepository;

    @Autowired
    private DevisMapper devisMapper;

    @Autowired
    private DevisService devisService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDevisMockMvc;

    private Devis devis;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DevisResource devisResource = new DevisResource(devisService);
        this.restDevisMockMvc = MockMvcBuilders.standaloneSetup(devisResource)
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
    public static Devis createEntity(EntityManager em) {
        Devis devis = new Devis()
            .date(DEFAULT_DATE)
            .retour(DEFAULT_RETOUR)
            .prix(DEFAULT_PRIX)
            .cout(DEFAULT_COUT)
            .validation(DEFAULT_VALIDATION)
            .poids(DEFAULT_POIDS)
            .numTicket(DEFAULT_NUM_TICKET)
            .details(DEFAULT_DETAILS);
        // Add required entity
        Article article = ArticleResourceIntTest.createEntity(em);
        em.persist(article);
        em.flush();
        devis.setArticle(article);
        return devis;
    }

    @Before
    public void initTest() {
        devis = createEntity(em);
    }

    @Test
    @Transactional
    public void createDevis() throws Exception {
        int databaseSizeBeforeCreate = devisRepository.findAll().size();

        // Create the Devis
        DevisDTO devisDTO = devisMapper.toDto(devis);
        restDevisMockMvc.perform(post("/api/devis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(devisDTO)))
            .andExpect(status().isCreated());

        // Validate the Devis in the database
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeCreate + 1);
        Devis testDevis = devisList.get(devisList.size() - 1);
        assertThat(testDevis.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testDevis.getRetour()).isEqualTo(DEFAULT_RETOUR);
        assertThat(testDevis.getPrix()).isEqualTo(DEFAULT_PRIX);
        assertThat(testDevis.getCout()).isEqualTo(DEFAULT_COUT);
        assertThat(testDevis.isValidation()).isEqualTo(DEFAULT_VALIDATION);
        assertThat(testDevis.getPoids()).isEqualTo(DEFAULT_POIDS);
        assertThat(testDevis.getNumTicket()).isEqualTo(DEFAULT_NUM_TICKET);
        assertThat(testDevis.getDetails()).isEqualTo(DEFAULT_DETAILS);
    }

    @Test
    @Transactional
    public void createDevisWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = devisRepository.findAll().size();

        // Create the Devis with an existing ID
        devis.setId(1L);
        DevisDTO devisDTO = devisMapper.toDto(devis);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDevisMockMvc.perform(post("/api/devis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(devisDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Devis in the database
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = devisRepository.findAll().size();
        // set the field null
        devis.setDate(null);

        // Create the Devis, which fails.
        DevisDTO devisDTO = devisMapper.toDto(devis);

        restDevisMockMvc.perform(post("/api/devis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(devisDTO)))
            .andExpect(status().isBadRequest());

        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrixIsRequired() throws Exception {
        int databaseSizeBeforeTest = devisRepository.findAll().size();
        // set the field null
        devis.setPrix(null);

        // Create the Devis, which fails.
        DevisDTO devisDTO = devisMapper.toDto(devis);

        restDevisMockMvc.perform(post("/api/devis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(devisDTO)))
            .andExpect(status().isBadRequest());

        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDevis() throws Exception {
        // Initialize the database
        devisRepository.saveAndFlush(devis);

        // Get all the devisList
        restDevisMockMvc.perform(get("/api/devis?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(devis.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].retour").value(hasItem(DEFAULT_RETOUR.toString())))
            .andExpect(jsonPath("$.[*].prix").value(hasItem(DEFAULT_PRIX.doubleValue())))
            .andExpect(jsonPath("$.[*].cout").value(hasItem(DEFAULT_COUT.doubleValue())))
            .andExpect(jsonPath("$.[*].validation").value(hasItem(DEFAULT_VALIDATION.booleanValue())))
            .andExpect(jsonPath("$.[*].poids").value(hasItem(DEFAULT_POIDS.doubleValue())))
            .andExpect(jsonPath("$.[*].numTicket").value(hasItem(DEFAULT_NUM_TICKET.toString())))
            .andExpect(jsonPath("$.[*].details").value(hasItem(DEFAULT_DETAILS.toString())));
    }

    @Test
    @Transactional
    public void getDevis() throws Exception {
        // Initialize the database
        devisRepository.saveAndFlush(devis);

        // Get the devis
        restDevisMockMvc.perform(get("/api/devis/{id}", devis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(devis.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.retour").value(DEFAULT_RETOUR.toString()))
            .andExpect(jsonPath("$.prix").value(DEFAULT_PRIX.doubleValue()))
            .andExpect(jsonPath("$.cout").value(DEFAULT_COUT.doubleValue()))
            .andExpect(jsonPath("$.validation").value(DEFAULT_VALIDATION.booleanValue()))
            .andExpect(jsonPath("$.poids").value(DEFAULT_POIDS.doubleValue()))
            .andExpect(jsonPath("$.numTicket").value(DEFAULT_NUM_TICKET.toString()))
            .andExpect(jsonPath("$.details").value(DEFAULT_DETAILS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDevis() throws Exception {
        // Get the devis
        restDevisMockMvc.perform(get("/api/devis/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDevis() throws Exception {
        // Initialize the database
        devisRepository.saveAndFlush(devis);
        int databaseSizeBeforeUpdate = devisRepository.findAll().size();

        // Update the devis
        Devis updatedDevis = devisRepository.findOne(devis.getId());
        // Disconnect from session so that the updates on updatedDevis are not directly saved in db
        em.detach(updatedDevis);
        updatedDevis
            .date(UPDATED_DATE)
            .retour(UPDATED_RETOUR)
            .prix(UPDATED_PRIX)
            .cout(UPDATED_COUT)
            .validation(UPDATED_VALIDATION)
            .poids(UPDATED_POIDS)
            .numTicket(UPDATED_NUM_TICKET)
            .details(UPDATED_DETAILS);
        DevisDTO devisDTO = devisMapper.toDto(updatedDevis);

        restDevisMockMvc.perform(put("/api/devis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(devisDTO)))
            .andExpect(status().isOk());

        // Validate the Devis in the database
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeUpdate);
        Devis testDevis = devisList.get(devisList.size() - 1);
        assertThat(testDevis.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testDevis.getRetour()).isEqualTo(UPDATED_RETOUR);
        assertThat(testDevis.getPrix()).isEqualTo(UPDATED_PRIX);
        assertThat(testDevis.getCout()).isEqualTo(UPDATED_COUT);
        assertThat(testDevis.isValidation()).isEqualTo(UPDATED_VALIDATION);
        assertThat(testDevis.getPoids()).isEqualTo(UPDATED_POIDS);
        assertThat(testDevis.getNumTicket()).isEqualTo(UPDATED_NUM_TICKET);
        assertThat(testDevis.getDetails()).isEqualTo(UPDATED_DETAILS);
    }

    @Test
    @Transactional
    public void updateNonExistingDevis() throws Exception {
        int databaseSizeBeforeUpdate = devisRepository.findAll().size();

        // Create the Devis
        DevisDTO devisDTO = devisMapper.toDto(devis);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDevisMockMvc.perform(put("/api/devis")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(devisDTO)))
            .andExpect(status().isCreated());

        // Validate the Devis in the database
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDevis() throws Exception {
        // Initialize the database
        devisRepository.saveAndFlush(devis);
        int databaseSizeBeforeDelete = devisRepository.findAll().size();

        // Get the devis
        restDevisMockMvc.perform(delete("/api/devis/{id}", devis.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Devis> devisList = devisRepository.findAll();
        assertThat(devisList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Devis.class);
        Devis devis1 = new Devis();
        devis1.setId(1L);
        Devis devis2 = new Devis();
        devis2.setId(devis1.getId());
        assertThat(devis1).isEqualTo(devis2);
        devis2.setId(2L);
        assertThat(devis1).isNotEqualTo(devis2);
        devis1.setId(null);
        assertThat(devis1).isNotEqualTo(devis2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DevisDTO.class);
        DevisDTO devisDTO1 = new DevisDTO();
        devisDTO1.setId(1L);
        DevisDTO devisDTO2 = new DevisDTO();
        assertThat(devisDTO1).isNotEqualTo(devisDTO2);
        devisDTO2.setId(devisDTO1.getId());
        assertThat(devisDTO1).isEqualTo(devisDTO2);
        devisDTO2.setId(2L);
        assertThat(devisDTO1).isNotEqualTo(devisDTO2);
        devisDTO1.setId(null);
        assertThat(devisDTO1).isNotEqualTo(devisDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(devisMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(devisMapper.fromId(null)).isNull();
    }
}
