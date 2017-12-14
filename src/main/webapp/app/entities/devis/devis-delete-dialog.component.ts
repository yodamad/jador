import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Devis } from './devis.model';
import { DevisPopupService } from './devis-popup.service';
import { DevisService } from './devis.service';

@Component({
    selector: 'jhi-devis-delete-dialog',
    templateUrl: './devis-delete-dialog.component.html'
})
export class DevisDeleteDialogComponent {

    devis: Devis;

    constructor(
        private devisService: DevisService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.devisService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'devisListModification',
                content: 'Deleted an devis'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-devis-delete-popup',
    template: ''
})
export class DevisDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private devisPopupService: DevisPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.devisPopupService
                .open(DevisDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
