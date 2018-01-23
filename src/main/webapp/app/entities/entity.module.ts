import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JadorArticleModule } from './article/article.module';
import { JadorVenteModule } from './vente/vente.module';
import { JadorClientModule } from './client/client.module';
import { JadorDevisModule } from './devis/devis.module';
import { JadorFournisseurModule } from './fournisseur/fournisseur.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JadorArticleModule,
        JadorVenteModule,
        JadorClientModule,
        JadorDevisModule,
        JadorFournisseurModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JadorEntityModule {}
