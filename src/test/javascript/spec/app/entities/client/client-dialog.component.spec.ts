/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JadorTestModule } from '../../../test.module';
import { ClientDialogComponent } from '../../../../../../main/webapp/app/entities/client/client-dialog.component';
import { ClientService } from '../../../../../../main/webapp/app/entities/client/client.service';
import { Client } from '../../../../../../main/webapp/app/entities/client/client.model';

describe('Component Tests', () => {

    describe('Client Management Dialog Component', () => {
        let comp: ClientDialogComponent;
        let fixture: ComponentFixture<ClientDialogComponent>;
        let service: ClientService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JadorTestModule],
                declarations: [ClientDialogComponent],
                providers: [
                    ClientService
                ]
            })
            .overrideTemplate(ClientDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Client(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.client = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'clientListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Client();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.client = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'clientListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
