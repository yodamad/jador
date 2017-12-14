import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Vente } from './vente.model';
import { VentePopupService } from './vente-popup.service';
import { VenteService } from './vente.service';
import { Article, ArticleService } from '../article';
import { Client, ClientService } from '../client';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-vente-dialog',
    templateUrl: './vente-dialog.component.html'
})
export class VenteDialogComponent implements OnInit {

    vente: Vente;
    isSaving: boolean;

    articles: Article[];

    clients: Client[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private venteService: VenteService,
        private articleService: ArticleService,
        private clientService: ClientService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.articleService
            .query({filter: 'vente-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.vente.articleId) {
                    this.articles = res.json;
                } else {
                    this.articleService
                        .find(this.vente.articleId)
                        .subscribe((subRes: Article) => {
                            this.articles = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.clientService.query()
            .subscribe((res: ResponseWrapper) => { this.clients = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.vente.id !== undefined) {
            this.subscribeToSaveResponse(
                this.venteService.update(this.vente));
        } else {
            this.subscribeToSaveResponse(
                this.venteService.create(this.vente));
        }
    }

    private subscribeToSaveResponse(result: Observable<Vente>) {
        result.subscribe((res: Vente) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Vente) {
        this.eventManager.broadcast({ name: 'venteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackArticleById(index: number, item: Article) {
        return item.id;
    }

    trackClientById(index: number, item: Client) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-vente-popup',
    template: ''
})
export class VentePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ventePopupService: VentePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ventePopupService
                    .open(VenteDialogComponent as Component, params['id']);
            } else {
                this.ventePopupService
                    .open(VenteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
