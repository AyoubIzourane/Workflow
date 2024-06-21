import { EntitePrimaire } from '../../entitePrimaire/interface/entitePrimaire';
import { Version } from '../../version/interface/version';
export declare class Workflow {
    id: number;
    titre: string;
    prefixe: string;
    status: string;
    description: string;
    entitePrimaire: EntitePrimaire;
    versions: Version[];
    default: boolean;
}
