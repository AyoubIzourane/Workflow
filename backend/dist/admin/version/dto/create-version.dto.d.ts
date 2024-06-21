import { CreateElementDto } from '../details/Element/dto/create-element.dto';
import { CreateNodeDto } from '../details/Node/dto/create-node.dto';
import { CreateLinkDto } from '../details/Link/dto/create-link.dto';
export declare class CreateVersionDto {
    readonly titre: string;
    readonly status: string;
    readonly description: string;
    readonly versionNumber: number;
    readonly createdAt: Date;
    readonly Element: CreateElementDto[];
    readonly nodeDataArray: CreateNodeDto[];
    readonly linkDataArray: CreateLinkDto[];
}
