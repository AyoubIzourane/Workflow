import { IsArray, ValidateNested } from "class-validator";
import { CreateNodeDto } from "../details/Node/dto/create-node.dto";
import { Type } from "class-transformer";
import { CreateLinkDto } from "../details/Link/dto/create-link.dto";
import { CreateElementDto } from "../details/Element/dto/create-element.dto";

export class UpdateVersionWithDetailsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateNodeDto)
    nodeDataArray: CreateNodeDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateLinkDto)
    linkDataArray: CreateLinkDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateElementDto)
    Element: CreateElementDto[];
}