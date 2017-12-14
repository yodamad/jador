import { BaseEntity } from './../../shared';

export class Client implements BaseEntity {
    constructor(
        public id?: number,
        public nom?: string,
        public prenom?: string,
        public adresse?: string,
        public codePostal?: number,
        public ville?: string,
        public email?: string,
        public telephone?: string,
        public achats?: BaseEntity[],
    ) {
    }
}
