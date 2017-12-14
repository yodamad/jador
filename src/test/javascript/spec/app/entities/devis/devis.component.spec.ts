/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JadorTestModule } from '../../../test.module';
import { DevisComponent } from '../../../../../../main/webapp/app/entities/devis/devis.component';
import { DevisService } from '../../../../../../main/webapp/app/entities/devis/devis.service';
import { Devis } from '../../../../../../main/webapp/app/entities/devis/devis.model';

describe('Component Tests', () => {

    describe('Devis Management Component', () => {
        let comp: DevisComponent;
        let fixture: ComponentFixture<DevisComponent>;
        let service: DevisService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JadorTestModule],
                declarations: [DevisComponent],
                providers: [
                    DevisService
                ]
            })
            .overrideTemplate(DevisComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DevisComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DevisService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Devis(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.devis[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
