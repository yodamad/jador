import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JadorSharedModule } from '../../shared';
import {
    DevisService,
    DevisPopupService,
    DevisComponent,
    DevisDetailComponent,
    DevisDialogComponent,
    DevisPopupComponent,
    DevisDeletePopupComponent,
    DevisDeleteDialogComponent,
    devisRoute,
    devisPopupRoute,
    DevisResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...devisRoute,
    ...devisPopupRoute,
];

@NgModule({
    imports: [
        JadorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DevisComponent,
        DevisDetailComponent,
        DevisDialogComponent,
        DevisDeleteDialogComponent,
        DevisPopupComponent,
        DevisDeletePopupComponent,
    ],
    entryComponents: [
        DevisComponent,
        DevisDialogComponent,
        DevisPopupComponent,
        DevisDeleteDialogComponent,
        DevisDeletePopupComponent,
    ],
    providers: [
        DevisService,
        DevisPopupService,
        DevisResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JadorDevisModule {}
