import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JadorSharedModule } from '../../shared';
import {
    FournisseurService,
    FournisseurPopupService,
    FournisseurComponent,
    FournisseurDetailComponent,
    FournisseurDialogComponent,
    FournisseurPopupComponent,
    FournisseurDeletePopupComponent,
    FournisseurDeleteDialogComponent,
    fournisseurRoute,
    fournisseurPopupRoute,
    FournisseurResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...fournisseurRoute,
    ...fournisseurPopupRoute,
];

@NgModule({
    imports: [
        JadorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FournisseurComponent,
        FournisseurDetailComponent,
        FournisseurDialogComponent,
        FournisseurDeleteDialogComponent,
        FournisseurPopupComponent,
        FournisseurDeletePopupComponent,
    ],
    entryComponents: [
        FournisseurComponent,
        FournisseurDialogComponent,
        FournisseurPopupComponent,
        FournisseurDeleteDialogComponent,
        FournisseurDeletePopupComponent,
    ],
    providers: [
        FournisseurService,
        FournisseurPopupService,
        FournisseurResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JadorFournisseurModule {}
