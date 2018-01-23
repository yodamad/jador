/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JadorTestModule } from '../../../test.module';
import { ClientDetailComponent } from '../../../../../../main/webapp/app/entities/client/client-detail.component';
import { ClientService } from '../../../../../../main/webapp/app/entities/client/client.service';
import { Client } from '../../../../../../main/webapp/app/entities/client/client.model';

describe('Component Tests', () => {

    describe('Client Management Detail Component', () => {
        let comp: ClientDetailComponent;
        let fixture: ComponentFixture<ClientDetailComponent>;
        let service: ClientService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JadorTestModule],
                declarations: [ClientDetailComponent],
                providers: [
                    ClientService
                ]
            })
            .overrideTemplate(ClientDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Client(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.client).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
