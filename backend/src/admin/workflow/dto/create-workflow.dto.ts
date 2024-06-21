// CreateWorkflowDto
import { IsBoolean, IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEntitePrimaireDto } from '../../entitePrimaire/dto/create-entitePrimaire.dto';

export class CreateWorkflowDto {
    @IsOptional()
    @IsString()
    readonly titre: string;

    @IsOptional()
    @IsString()
    readonly prefixe: string;

    @IsOptional()
    @IsString()
    readonly status: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateEntitePrimaireDto)
    readonly entitePrimaire: CreateEntitePrimaireDto; 

    @IsOptional()
    @IsBoolean()
    readonly default: boolean;
}
