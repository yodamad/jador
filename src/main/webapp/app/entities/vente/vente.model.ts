import { BaseEntity } from './../../shared';

export class Vente implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public prix?: number,
        public promotion?: number,
        public poids?: number,
        public articleId?: number,
        public clientRefId?: number,
    ) {
    }
}
