import { Workflow } from "./Workflow";
import { Element } from "./Element";
import { Node } from "./Node";
import { Link } from "./Link";

export interface Version {
    id: number;
    titre?: string;
    status?: string;
    description?: string;
    createdAt?: Date;
    default?: boolean;
    versionNumber?: number;
    workflow?: Workflow; 
    elements: Element[];
    nodes: Node[];
    links: Link[];
}
