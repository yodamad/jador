import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ArticleComponent } from './article.component';
import { ArticleDetailComponent } from './article-detail.component';
import { ArticlePopupComponent } from './article-dialog.component';
import { ArticleDeletePopupComponent } from './article-delete-dialog.component';

@Injectable()
export class ArticleResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const articleRoute: Routes = [
    {
        path: 'article',
        component: ArticleComponent,
        resolve: {
            'pagingParams': ArticleResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.article.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'article/:id',
        component: ArticleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.article.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const articlePopupRoute: Routes = [
    {
        path: 'article-new',
        component: ArticlePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.article.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'article/:id/edit',
        component: ArticlePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.article.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'article/:id/delete',
        component: ArticleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.article.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
