import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Devis } from './devis.model';
import { DevisService } from './devis.service';

@Component({
    selector: 'jhi-devis-detail',
    templateUrl: './devis-detail.component.html'
})
export class DevisDetailComponent implements OnInit, OnDestroy {

    devis: Devis;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private devisService: DevisService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDevis();
    }

    load(id) {
        this.devisService.find(id).subscribe((devis) => {
            this.devis = devis;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDevis() {
        this.eventSubscriber = this.eventManager.subscribe(
            'devisListModification',
            (response) => this.load(this.devis.id)
        );
    }
}
