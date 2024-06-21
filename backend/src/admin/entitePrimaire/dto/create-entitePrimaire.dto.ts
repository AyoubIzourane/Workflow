import { IsString, IsNotEmpty, IsNumber,IsOptional } from 'class-validator';

export class CreateEntitePrimaireDto {
    @IsOptional()
    @IsString()
    readonly prefixe: string;

    @IsOptional()
    @IsString()
    readonly libelle: string;

    @IsOptional()
    @IsNumber()
    readonly startwith: number;

    @IsOptional()
    @IsNumber()
    readonly currentvalue: number;

    @IsOptional()
    @IsString()
    readonly databaseEntity: string;
    }

