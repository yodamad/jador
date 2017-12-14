import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { VenteComponent } from './vente.component';
import { VenteDetailComponent } from './vente-detail.component';
import { VentePopupComponent } from './vente-dialog.component';
import { VenteDeletePopupComponent } from './vente-delete-dialog.component';

@Injectable()
export class VenteResolvePagingParams implements Resolve<any> {

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

export const venteRoute: Routes = [
    {
        path: 'vente',
        component: VenteComponent,
        resolve: {
            'pagingParams': VenteResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.vente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vente/:id',
        component: VenteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.vente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ventePopupRoute: Routes = [
    {
        path: 'vente-new',
        component: VentePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.vente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vente/:id/edit',
        component: VentePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.vente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vente/:id/delete',
        component: VenteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.vente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
