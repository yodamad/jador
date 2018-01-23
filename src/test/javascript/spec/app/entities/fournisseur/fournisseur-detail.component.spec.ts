/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { JadorTestModule } from '../../../test.module';
import { FournisseurDetailComponent } from '../../../../../../main/webapp/app/entities/fournisseur/fournisseur-detail.component';
import { FournisseurService } from '../../../../../../main/webapp/app/entities/fournisseur/fournisseur.service';
import { Fournisseur } from '../../../../../../main/webapp/app/entities/fournisseur/fournisseur.model';

describe('Component Tests', () => {

    describe('Fournisseur Management Detail Component', () => {
        let comp: FournisseurDetailComponent;
        let fixture: ComponentFixture<FournisseurDetailComponent>;
        let service: FournisseurService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JadorTestModule],
                declarations: [FournisseurDetailComponent],
                providers: [
                    FournisseurService
                ]
            })
            .overrideTemplate(FournisseurDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FournisseurDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FournisseurService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Fournisseur(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fournisseur).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
