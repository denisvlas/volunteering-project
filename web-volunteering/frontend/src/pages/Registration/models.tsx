 export enum functiiType{
    organizator='organizator',
    voluntar='voluntar',
    sponsor='sponsor',
}

export type functii=functiiType.organizator|functiiType.sponsor|functiiType.voluntar;