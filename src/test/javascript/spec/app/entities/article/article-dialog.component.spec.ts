/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JadorTestModule } from '../../../test.module';
import { ArticleDialogComponent } from '../../../../../../main/webapp/app/entities/article/article-dialog.component';
import { ArticleService } from '../../../../../../main/webapp/app/entities/article/article.service';
import { Article } from '../../../../../../main/webapp/app/entities/article/article.model';

describe('Component Tests', () => {

    describe('Article Management Dialog Component', () => {
        let comp: ArticleDialogComponent;
        let fixture: ComponentFixture<ArticleDialogComponent>;
        let service: ArticleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JadorTestModule],
                declarations: [ArticleDialogComponent],
                providers: [
                    ArticleService
                ]
            })
            .overrideTemplate(ArticleDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ArticleDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArticleService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Article(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.article = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'articleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Article();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.article = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'articleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
