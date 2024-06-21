import { IsBoolean, IsString, IsOptional, ValidateNested, IsDate, IsNumber, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateElementDto } from '../details/Element/dto/create-element.dto';
import { CreateNodeDto } from '../details/Node/dto/create-node.dto';
import { CreateLinkDto } from '../details/Link/dto/create-link.dto';

export class CreateVersionDto {

    @IsOptional()
    @IsString()
    readonly titre: string;

    @IsOptional()
    @IsString()
    readonly status: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsNumber()
    readonly versionNumber: number;
    
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly createdAt: Date = new Date(); 

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateElementDto)
    readonly Element: CreateElementDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateNodeDto)
    readonly nodeDataArray: CreateNodeDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateLinkDto)
    readonly linkDataArray: CreateLinkDto[];
}
