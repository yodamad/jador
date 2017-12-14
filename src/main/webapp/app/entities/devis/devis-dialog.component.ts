import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Devis } from './devis.model';
import { DevisPopupService } from './devis-popup.service';
import { DevisService } from './devis.service';
import { Article, ArticleService } from '../article';
import { Fournisseur, FournisseurService } from '../fournisseur';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-devis-dialog',
    templateUrl: './devis-dialog.component.html'
})
export class DevisDialogComponent implements OnInit {

    devis: Devis;
    isSaving: boolean;

    articles: Article[];

    fournisseurs: Fournisseur[];
    dateDp: any;
    retourDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private devisService: DevisService,
        private articleService: ArticleService,
        private fournisseurService: FournisseurService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.articleService
            .query({filter: 'devis-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.devis.articleId) {
                    this.articles = res.json;
                } else {
                    this.articleService
                        .find(this.devis.articleId)
                        .subscribe((subRes: Article) => {
                            this.articles = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.fournisseurService.query()
            .subscribe((res: ResponseWrapper) => { this.fournisseurs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.devis.id !== undefined) {
            this.subscribeToSaveResponse(
                this.devisService.update(this.devis));
        } else {
            this.subscribeToSaveResponse(
                this.devisService.create(this.devis));
        }
    }

    private subscribeToSaveResponse(result: Observable<Devis>) {
        result.subscribe((res: Devis) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Devis) {
        this.eventManager.broadcast({ name: 'devisListModification', content: 'OK'});
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

    trackFournisseurById(index: number, item: Fournisseur) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-devis-popup',
    template: ''
})
export class DevisPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private devisPopupService: DevisPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.devisPopupService
                    .open(DevisDialogComponent as Component, params['id']);
            } else {
                this.devisPopupService
                    .open(DevisDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
