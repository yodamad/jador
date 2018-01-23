import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Vente } from './vente.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class VenteService {

    private resourceUrl =  SERVER_API_URL + 'api/ventes';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(vente: Vente): Observable<Vente> {
        const copy = this.convert(vente);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(vente: Vente): Observable<Vente> {
        const copy = this.convert(vente);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Vente> {
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
     * Convert a returned JSON object to Vente.
     */
    private convertItemFromServer(json: any): Vente {
        const entity: Vente = Object.assign(new Vente(), json);
        entity.date = this.dateUtils
            .convertLocalDateFromServer(json.date);
        return entity;
    }

    /**
     * Convert a Vente to a JSON which can be sent to the server.
     */
    private convert(vente: Vente): Vente {
        const copy: Vente = Object.assign({}, vente);
        copy.date = this.dateUtils
            .convertLocalDateToServer(vente.date);
        return copy;
    }
}
