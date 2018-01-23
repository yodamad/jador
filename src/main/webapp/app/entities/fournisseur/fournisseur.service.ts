import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Fournisseur } from './fournisseur.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FournisseurService {

    private resourceUrl =  SERVER_API_URL + 'api/fournisseurs';

    constructor(private http: Http) { }

    create(fournisseur: Fournisseur): Observable<Fournisseur> {
        const copy = this.convert(fournisseur);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(fournisseur: Fournisseur): Observable<Fournisseur> {
        const copy = this.convert(fournisseur);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Fournisseur> {
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
     * Convert a returned JSON object to Fournisseur.
     */
    private convertItemFromServer(json: any): Fournisseur {
        const entity: Fournisseur = Object.assign(new Fournisseur(), json);
        return entity;
    }

    /**
     * Convert a Fournisseur to a JSON which can be sent to the server.
     */
    private convert(fournisseur: Fournisseur): Fournisseur {
        const copy: Fournisseur = Object.assign({}, fournisseur);
        return copy;
    }
}
