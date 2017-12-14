import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Fournisseur } from './fournisseur.model';
import { FournisseurPopupService } from './fournisseur-popup.service';
import { FournisseurService } from './fournisseur.service';

@Component({
    selector: 'jhi-fournisseur-delete-dialog',
    templateUrl: './fournisseur-delete-dialog.component.html'
})
export class FournisseurDeleteDialogComponent {

    fournisseur: Fournisseur;

    constructor(
        private fournisseurService: FournisseurService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fournisseurService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'fournisseurListModification',
                content: 'Deleted an fournisseur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fournisseur-delete-popup',
    template: ''
})
export class FournisseurDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fournisseurPopupService: FournisseurPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fournisseurPopupService
                .open(FournisseurDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
