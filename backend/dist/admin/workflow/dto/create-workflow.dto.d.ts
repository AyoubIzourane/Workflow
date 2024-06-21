import { CreateEntitePrimaireDto } from '../../entitePrimaire/dto/create-entitePrimaire.dto';
export declare class CreateWorkflowDto {
    readonly titre: string;
    readonly prefixe: string;
    readonly status: string;
    readonly description: string;
    readonly entitePrimaire: CreateEntitePrimaireDto;
    readonly default: boolean;
}
