import { IsBoolean, IsString, IsOptional, ValidateNested, IsDate, IsNumber, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateElementDto } from '../details/Element/dto/create-element.dto';

export class UpdateVersionDto {

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


}
