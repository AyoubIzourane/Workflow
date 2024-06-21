import { EntitePrimaire } from './interface/entitePrimaire';
import { Repository } from 'typeorm';
import { CreateEntitePrimaireDto } from './dto/create-entitePrimaire.dto';
import { UpdateEntitePrimaireDto } from './dto/update-entitePrimaire.dto';
export declare class EntitePrimaireService {
    private readonly entitePrimaireRepository;
    private readonly entitePrimaire;
    constructor(entitePrimaireRepository: Repository<EntitePrimaire>);
    findAll(): Promise<EntitePrimaire[]>;
    findOne(id: number): Promise<EntitePrimaire>;
    create(createEntitePrimaireDto: CreateEntitePrimaireDto): Promise<EntitePrimaire>;
    update(id: number, updateEntitePrimaireDto: UpdateEntitePrimaireDto): Promise<EntitePrimaire>;
    remove(id: number): Promise<void>;
}
