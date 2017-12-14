import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JadorSharedModule } from '../../shared';
import {
    VenteService,
    VentePopupService,
    VenteComponent,
    VenteDetailComponent,
    VenteDialogComponent,
    VentePopupComponent,
    VenteDeletePopupComponent,
    VenteDeleteDialogComponent,
    venteRoute,
    ventePopupRoute,
    VenteResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...venteRoute,
    ...ventePopupRoute,
];

@NgModule({
    imports: [
        JadorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VenteComponent,
        VenteDetailComponent,
        VenteDialogComponent,
        VenteDeleteDialogComponent,
        VentePopupComponent,
        VenteDeletePopupComponent,
    ],
    entryComponents: [
        VenteComponent,
        VenteDialogComponent,
        VentePopupComponent,
        VenteDeleteDialogComponent,
        VenteDeletePopupComponent,
    ],
    providers: [
        VenteService,
        VentePopupService,
        VenteResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JadorVenteModule {}
