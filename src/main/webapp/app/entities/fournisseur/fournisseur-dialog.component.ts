import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Fournisseur } from './fournisseur.model';
import { FournisseurPopupService } from './fournisseur-popup.service';
import { FournisseurService } from './fournisseur.service';

@Component({
    selector: 'jhi-fournisseur-dialog',
    templateUrl: './fournisseur-dialog.component.html'
})
export class FournisseurDialogComponent implements OnInit {

    fournisseur: Fournisseur;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private fournisseurService: FournisseurService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.fournisseur.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fournisseurService.update(this.fournisseur));
        } else {
            this.subscribeToSaveResponse(
                this.fournisseurService.create(this.fournisseur));
        }
    }

    private subscribeToSaveResponse(result: Observable<Fournisseur>) {
        result.subscribe((res: Fournisseur) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Fournisseur) {
        this.eventManager.broadcast({ name: 'fournisseurListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-fournisseur-popup',
    template: ''
})
export class FournisseurPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fournisseurPopupService: FournisseurPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fournisseurPopupService
                    .open(FournisseurDialogComponent as Component, params['id']);
            } else {
                this.fournisseurPopupService
                    .open(FournisseurDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
