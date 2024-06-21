import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateNodeDto {
    @IsOptional()
    @IsString()
    readonly category: string;

    @IsOptional()
    @IsString()
    readonly text: string;

    @IsOptional()
    @IsNumber()
    readonly key: number;

    @IsOptional()
    @IsString()
    readonly loc: string;
}
