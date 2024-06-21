import { PartialType } from '@nestjs/mapped-types';
import { CreateEntitePrimaireDto } from './create-entitePrimaire.dto';

export class UpdateEntitePrimaireDto extends PartialType(CreateEntitePrimaireDto) {}
