import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JadorSharedModule } from '../../shared';
import {
    ArticleService,
    ArticlePopupService,
    ArticleComponent,
    ArticleDetailComponent,
    ArticleDialogComponent,
    ArticlePopupComponent,
    ArticleDeletePopupComponent,
    ArticleDeleteDialogComponent,
    articleRoute,
    articlePopupRoute,
    ArticleResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...articleRoute,
    ...articlePopupRoute,
];

@NgModule({
    imports: [
        JadorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ArticleComponent,
        ArticleDetailComponent,
        ArticleDialogComponent,
        ArticleDeleteDialogComponent,
        ArticlePopupComponent,
        ArticleDeletePopupComponent,
    ],
    entryComponents: [
        ArticleComponent,
        ArticleDialogComponent,
        ArticlePopupComponent,
        ArticleDeleteDialogComponent,
        ArticleDeletePopupComponent,
    ],
    providers: [
        ArticleService,
        ArticlePopupService,
        ArticleResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JadorArticleModule {}
