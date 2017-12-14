import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { FournisseurComponent } from './fournisseur.component';
import { FournisseurDetailComponent } from './fournisseur-detail.component';
import { FournisseurPopupComponent } from './fournisseur-dialog.component';
import { FournisseurDeletePopupComponent } from './fournisseur-delete-dialog.component';

@Injectable()
export class FournisseurResolvePagingParams implements Resolve<any> {

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

export const fournisseurRoute: Routes = [
    {
        path: 'fournisseur',
        component: FournisseurComponent,
        resolve: {
            'pagingParams': FournisseurResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.fournisseur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'fournisseur/:id',
        component: FournisseurDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.fournisseur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fournisseurPopupRoute: Routes = [
    {
        path: 'fournisseur-new',
        component: FournisseurPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.fournisseur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fournisseur/:id/edit',
        component: FournisseurPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.fournisseur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fournisseur/:id/delete',
        component: FournisseurDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.fournisseur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
