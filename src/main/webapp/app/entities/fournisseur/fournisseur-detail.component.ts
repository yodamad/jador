import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Fournisseur } from './fournisseur.model';
import { FournisseurService } from './fournisseur.service';

@Component({
    selector: 'jhi-fournisseur-detail',
    templateUrl: './fournisseur-detail.component.html'
})
export class FournisseurDetailComponent implements OnInit, OnDestroy {

    fournisseur: Fournisseur;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private fournisseurService: FournisseurService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFournisseurs();
    }

    load(id) {
        this.fournisseurService.find(id).subscribe((fournisseur) => {
            this.fournisseur = fournisseur;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFournisseurs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'fournisseurListModification',
            (response) => this.load(this.fournisseur.id)
        );
    }
}
