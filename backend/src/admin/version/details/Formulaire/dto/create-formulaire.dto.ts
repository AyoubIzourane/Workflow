import { IsString, IsOptional, IsNumber, IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFormulaireDto {
    @IsString()
    readonly formulaireValues: string;

    @IsBoolean()
    readonly resultat: boolean;

    @IsNumber()
    readonly nextNode: number;
}