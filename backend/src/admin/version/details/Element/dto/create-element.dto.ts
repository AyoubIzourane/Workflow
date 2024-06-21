import { IsString, IsOptional, IsNumber, IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFormulaireDto } from '../../Formulaire/dto/create-formulaire.dto';

export class CreateElementDto {
    @IsNumber()
    readonly key: number;

    @IsString()
    readonly titre: string;

    @IsOptional()
    @IsString()
    readonly approbateur: string;

    @IsOptional()
    @IsBoolean()
    readonly escalader: boolean;

    @IsOptional()
    @IsNumber()
    readonly delaiEscalade: number;

    @IsOptional()
    @IsBoolean()
    readonly resultat: boolean;


    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateFormulaireDto)
    readonly formulaire: CreateFormulaireDto[];
}
