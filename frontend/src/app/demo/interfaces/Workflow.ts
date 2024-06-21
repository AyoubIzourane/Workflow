import { EntitePrimaire } from "./EntitePrimaire";
import { Version } from "./Version";

export interface Workflow {
    id: number;
    titre?: string;
    prefixe?: string;
    status?: string;
    description?: string;
    entitePrimaire?: EntitePrimaire; 
    default?: boolean;
    versions?: Version[]; 
}
