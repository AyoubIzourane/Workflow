import { Formulaire } from '../../Formulaire/interface/Formulaire';
import { Version } from 'src/admin/version/interface/version';
export declare class Element {
    id: number;
    key: number;
    titre: string;
    approbateur: string;
    escalader: boolean;
    delaiEscalade: number;
    workflow: string;
    resultat: boolean;
    formulaires: Formulaire[];
    version: Version;
}
