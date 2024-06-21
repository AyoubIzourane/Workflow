import { Formulaire } from "./Formulaire";
import { Version } from "./Version";

export interface Element {
    id: number;
    key: number;
    titre: string;
    approbateur: string;
    escalader: boolean;
    delaiEscalade: number;
    workflow: string;
    resultat:boolean;
    formulaires: Formulaire[];
    version: Version;
}