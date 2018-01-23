/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JadorTestModule } from '../../../test.module';
import { FournisseurDialogComponent } from '../../../../../../main/webapp/app/entities/fournisseur/fournisseur-dialog.component';
import { FournisseurService } from '../../../../../../main/webapp/app/entities/fournisseur/fournisseur.service';
import { Fournisseur } from '../../../../../../main/webapp/app/entities/fournisseur/fournisseur.model';

describe('Component Tests', () => {

    describe('Fournisseur Management Dialog Component', () => {
        let comp: FournisseurDialogComponent;
        let fixture: ComponentFixture<FournisseurDialogComponent>;
        let service: FournisseurService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JadorTestModule],
                declarations: [FournisseurDialogComponent],
                providers: [
                    FournisseurService
                ]
            })
            .overrideTemplate(FournisseurDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FournisseurDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FournisseurService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Fournisseur(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.fournisseur = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fournisseurListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Fournisseur();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.fournisseur = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fournisseurListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
