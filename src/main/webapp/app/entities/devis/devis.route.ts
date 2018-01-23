import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DevisComponent } from './devis.component';
import { DevisDetailComponent } from './devis-detail.component';
import { DevisPopupComponent } from './devis-dialog.component';
import { DevisDeletePopupComponent } from './devis-delete-dialog.component';

@Injectable()
export class DevisResolvePagingParams implements Resolve<any> {

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

export const devisRoute: Routes = [
    {
        path: 'devis',
        component: DevisComponent,
        resolve: {
            'pagingParams': DevisResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.devis.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'devis/:id',
        component: DevisDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.devis.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const devisPopupRoute: Routes = [
    {
        path: 'devis-new',
        component: DevisPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.devis.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'devis/:id/edit',
        component: DevisPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.devis.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'devis/:id/delete',
        component: DevisDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jadorApp.devis.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
