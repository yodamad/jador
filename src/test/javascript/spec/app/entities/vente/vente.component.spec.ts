/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JadorTestModule } from '../../../test.module';
import { VenteComponent } from '../../../../../../main/webapp/app/entities/vente/vente.component';
import { VenteService } from '../../../../../../main/webapp/app/entities/vente/vente.service';
import { Vente } from '../../../../../../main/webapp/app/entities/vente/vente.model';

describe('Component Tests', () => {

    describe('Vente Management Component', () => {
        let comp: VenteComponent;
        let fixture: ComponentFixture<VenteComponent>;
        let service: VenteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JadorTestModule],
                declarations: [VenteComponent],
                providers: [
                    VenteService
                ]
            })
            .overrideTemplate(VenteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VenteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VenteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Vente(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ventes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
