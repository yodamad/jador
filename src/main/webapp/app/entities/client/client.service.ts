import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Client } from './client.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ClientService {

    private resourceUrl =  SERVER_API_URL + 'api/clients';

    constructor(private http: Http) { }

    create(client: Client): Observable<Client> {
        const copy = this.convert(client);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(client: Client): Observable<Client> {
        const copy = this.convert(client);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Client> {
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
     * Convert a returned JSON object to Client.
     */
    private convertItemFromServer(json: any): Client {
        const entity: Client = Object.assign(new Client(), json);
        return entity;
    }

    /**
     * Convert a Client to a JSON which can be sent to the server.
     */
    private convert(client: Client): Client {
        const copy: Client = Object.assign({}, client);
        return copy;
    }
}
