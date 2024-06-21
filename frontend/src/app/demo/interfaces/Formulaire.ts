import { Element } from "./Element";

export interface Formulaire {
    id: number;
    formulaireValues: string;
    resultat:boolean;
    nextNode: number;
    element: Element;
}