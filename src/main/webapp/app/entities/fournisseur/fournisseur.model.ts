import { BaseEntity } from './../../shared';

export class Fournisseur implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public telephone?: string,
        public email?: string,
        public fax?: string,
        public adresse?: string,
        public codePostal?: number,
        public ville?: string,
        public devis?: BaseEntity[],
    ) {
    }
}
