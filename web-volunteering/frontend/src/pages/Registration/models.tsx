 export enum functiiType{
    organizator='organizator',
    voluntar='voluntar',
    sponsor='sponsor',
}

 export enum functiiTypeBD{
    organizatori='organizatori',
    voluntari='voluntari',
    sponsori='sponsori',
}


export interface User{
    functie:string,
    nume:string
    prenume:string,
    email:string,
    telefon:string,
    numeOrganizatie:string,
    cont:string,
    password:string;
    logged:boolean;
}

export interface ProfileInfo{
    id:number;
    nume:string,
    prenume:string,
    telefon:string
    likeuri:number
    email:string
    numar_proiecte:number
    suma_donata:number
}

export type functiiDB=functiiTypeBD.organizatori|functiiTypeBD.sponsori|functiiTypeBD.voluntari;
export type functii=functiiType.organizator|functiiType.sponsor|functiiType.voluntar;