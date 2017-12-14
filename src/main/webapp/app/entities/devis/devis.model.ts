import { BaseEntity } from './../../shared';

export class Devis implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public retour?: any,
        public prix?: number,
        public cout?: number,
        public validation?: boolean,
        public poids?: number,
        public numTicket?: string,
        public details?: string,
        public articleId?: number,
        public fournisseurRefId?: number,
    ) {
        this.validation = false;
    }
}
