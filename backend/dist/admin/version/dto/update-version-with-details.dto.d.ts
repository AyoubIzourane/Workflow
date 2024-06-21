import { CreateNodeDto } from "../details/Node/dto/create-node.dto";
import { CreateLinkDto } from "../details/Link/dto/create-link.dto";
import { CreateElementDto } from "../details/Element/dto/create-element.dto";
export declare class UpdateVersionWithDetailsDto {
    nodeDataArray: CreateNodeDto[];
    linkDataArray: CreateLinkDto[];
    Element: CreateElementDto[];
}
