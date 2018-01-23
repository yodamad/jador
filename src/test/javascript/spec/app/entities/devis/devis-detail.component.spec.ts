/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JadorTestModule } from '../../../test.module';
import { DevisDetailComponent } from '../../../../../../main/webapp/app/entities/devis/devis-detail.component';
import { DevisService } from '../../../../../../main/webapp/app/entities/devis/devis.service';
import { Devis } from '../../../../../../main/webapp/app/entities/devis/devis.model';

describe('Component Tests', () => {

    describe('Devis Management Detail Component', () => {
        let comp: DevisDetailComponent;
        let fixture: ComponentFixture<DevisDetailComponent>;
        let service: DevisService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JadorTestModule],
                declarations: [DevisDetailComponent],
                providers: [
                    DevisService
                ]
            })
            .overrideTemplate(DevisDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DevisDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DevisService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Devis(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.devis).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
