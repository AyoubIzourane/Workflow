import { EntitePrimaireService } from './entitePrimaire.service';
import { CreateEntitePrimaireDto } from './dto/create-entitePrimaire.dto';
import { UpdateEntitePrimaireDto } from './dto/update-entitePrimaire.dto';
export declare class EntitePrimaireController {
    private readonly entitePrimaireService;
    constructor(entitePrimaireService: EntitePrimaireService);
    findAll(): Promise<import("./interface/entitePrimaire").EntitePrimaire[]>;
    findOne(id: number): Promise<import("./interface/entitePrimaire").EntitePrimaire>;
    create(createEntitePrimaireDto: CreateEntitePrimaireDto): Promise<import("./interface/entitePrimaire").EntitePrimaire>;
    update(id: number, updateEntitePrimaireDto: UpdateEntitePrimaireDto): Promise<import("./interface/entitePrimaire").EntitePrimaire>;
    remove(id: number): Promise<void>;
}
