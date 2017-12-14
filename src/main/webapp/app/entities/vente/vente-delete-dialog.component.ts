import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Vente } from './vente.model';
import { VentePopupService } from './vente-popup.service';
import { VenteService } from './vente.service';

@Component({
    selector: 'jhi-vente-delete-dialog',
    templateUrl: './vente-delete-dialog.component.html'
})
export class VenteDeleteDialogComponent {

    vente: Vente;

    constructor(
        private venteService: VenteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.venteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'venteListModification',
                content: 'Deleted an vente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vente-delete-popup',
    template: ''
})
export class VenteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ventePopupService: VentePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ventePopupService
                .open(VenteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
