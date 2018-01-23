/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JadorTestModule } from '../../../test.module';
import { ClientComponent } from '../../../../../../main/webapp/app/entities/client/client.component';
import { ClientService } from '../../../../../../main/webapp/app/entities/client/client.service';
import { Client } from '../../../../../../main/webapp/app/entities/client/client.model';

describe('Component Tests', () => {

    describe('Client Management Component', () => {
        let comp: ClientComponent;
        let fixture: ComponentFixture<ClientComponent>;
        let service: ClientService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JadorTestModule],
                declarations: [ClientComponent],
                providers: [
                    ClientService
                ]
            })
            .overrideTemplate(ClientComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Client(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.clients[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
