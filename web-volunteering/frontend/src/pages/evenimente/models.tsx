export interface Projects{
    categorie: string,
    id_proiect: number,
    img: string
    inceput: string,
    nume:string,
    oras:string,
    organizator:string,
    sfarsit:string,
    status: string
    strada: string
    suma: string
    tara: string
    descriere:string
}

export enum menu{
    InformatiiGenerale='Informatii generale',
    Necesitati='Necesitati',
    Statistica='Statistica'
}

export type menuType=menu.InformatiiGenerale|menu.Necesitati|menu.Statistica

export interface Necesitati{
    cantitate:string;
    necesitate:string
}