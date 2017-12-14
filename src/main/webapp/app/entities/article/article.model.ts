import { BaseEntity } from './../../shared';

export class Article implements BaseEntity {
    constructor(
        public id?: number,
        public reference?: string,
        public marque?: string,
        public metal?: string,
        public stock?: number,
        public prixAchat?: number,
        public poids?: number,
        public dateAchat?: any,
        public livrePolice?: string,
    ) {
    }
}
