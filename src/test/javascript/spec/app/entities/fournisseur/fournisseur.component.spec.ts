/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { JadorTestModule } from '../../../test.module';
import { FournisseurComponent } from '../../../../../../main/webapp/app/entities/fournisseur/fournisseur.component';
import { FournisseurService } from '../../../../../../main/webapp/app/entities/fournisseur/fournisseur.service';
import { Fournisseur } from '../../../../../../main/webapp/app/entities/fournisseur/fournisseur.model';

describe('Component Tests', () => {

    describe('Fournisseur Management Component', () => {
        let comp: FournisseurComponent;
        let fixture: ComponentFixture<FournisseurComponent>;
        let service: FournisseurService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JadorTestModule],
                declarations: [FournisseurComponent],
                providers: [
                    FournisseurService
                ]
            })
            .overrideTemplate(FournisseurComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FournisseurComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FournisseurService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Fournisseur(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fournisseurs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
