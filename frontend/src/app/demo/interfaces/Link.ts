import { Version } from "./Version";

export interface Link {
    id: number;
    from: number;
    to: number;
    points: number[];
    version: Version;
}