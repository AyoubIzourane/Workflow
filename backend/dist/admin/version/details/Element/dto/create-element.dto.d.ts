import { CreateFormulaireDto } from '../../Formulaire/dto/create-formulaire.dto';
export declare class CreateElementDto {
    readonly key: number;
    readonly titre: string;
    readonly approbateur: string;
    readonly escalader: boolean;
    readonly delaiEscalade: number;
    readonly resultat: boolean;
    readonly formulaire: CreateFormulaireDto[];
}
