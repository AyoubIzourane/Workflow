import { Version } from "./Version";

export interface Node {
    id: number;
    category: string;
    text: string;
    key: number;
    loc: string;
    version: Version;
}