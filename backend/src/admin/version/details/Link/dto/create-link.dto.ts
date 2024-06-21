import { IsNumber, IsOptional } from 'class-validator';

export class CreateLinkDto {
    @IsOptional()
    @IsNumber()
    readonly from: number;

    @IsOptional()
    @IsNumber()
    readonly to: number;
    
    @IsOptional()
    @IsNumber({}, { each: true })
    readonly points: number[];
}
