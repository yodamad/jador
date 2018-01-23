import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Devis } from './devis.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class DevisService {

    private resourceUrl = SERVER_API_URL + 'api/devis';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(devis: Devis): Observable<Devis> {
        const copy = this.convert(devis);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(devis: Devis): Observable<Devis> {
        const copy = this.convert(devis);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Devis> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Devis.
     */
    private convertItemFromServer(json: any): Devis {
        const entity: Devis = Object.assign(new Devis(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        entity.retour = this.dateUtils
            .convertLocalDateFromServer(json.retour);
        return entity;
    }

    /**
     * Convert a Devis to a JSON which can be sent to the server.
     */
    private convert(devis: Devis): Devis {
        const copy: Devis = Object.assign({}, devis);
        copy.date = this.dateUtils
            .convertLocalDateToServer(devis.date);
        copy.retour = this.dateUtils
            .convertLocalDateToServer(devis.retour);
        return copy;
    }
}
