import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Vente } from './vente.model';
import { VenteService } from './vente.service';

@Component({
    selector: 'jhi-vente-detail',
    templateUrl: './vente-detail.component.html'
})
export class VenteDetailComponent implements OnInit, OnDestroy {

    vente: Vente;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private venteService: VenteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVentes();
    }

    load(id) {
        this.venteService.find(id).subscribe((vente) => {
            this.vente = vente;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVentes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'venteListModification',
            (response) => this.load(this.vente.id)
        );
    }
}
