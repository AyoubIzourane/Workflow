import { Workflow } from '../../workflow/interface/workflow';
import { Element } from '../details/Element/interface/Element';
import { Node } from '../details/Node/interface/Node';
import { Link } from '../details/Link/interface/Link';
export declare class Version {
    id: number;
    titre: string;
    status: string;
    description: string;
    createdAt: Date;
    default: boolean;
    versionNumber: number;
    workflow: Workflow;
    elements: Element[];
    nodes: Node[];
    links: Link[];
    setDefaults(): void;
}
