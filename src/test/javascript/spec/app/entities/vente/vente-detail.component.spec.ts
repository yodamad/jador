/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JadorTestModule } from '../../../test.module';
import { VenteDetailComponent } from '../../../../../../main/webapp/app/entities/vente/vente-detail.component';
import { VenteService } from '../../../../../../main/webapp/app/entities/vente/vente.service';
import { Vente } from '../../../../../../main/webapp/app/entities/vente/vente.model';

describe('Component Tests', () => {

    describe('Vente Management Detail Component', () => {
        let comp: VenteDetailComponent;
        let fixture: ComponentFixture<VenteDetailComponent>;
        let service: VenteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JadorTestModule],
                declarations: [VenteDetailComponent],
                providers: [
                    VenteService
                ]
            })
            .overrideTemplate(VenteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VenteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VenteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Vente(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.vente).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
