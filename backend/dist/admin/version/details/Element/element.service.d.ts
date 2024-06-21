import { Repository } from 'typeorm';
import { Element } from './interface/Element';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { Formulaire } from '../Formulaire/interface/Formulaire';
export declare class ElementService {
    private readonly elementRepository;
    private readonly formulaireRepository;
    constructor(elementRepository: Repository<Element>, formulaireRepository: Repository<Formulaire>);
    findAll(): Promise<Element[]>;
    findOne(id: number): Promise<Element>;
    create(createElementDto: CreateElementDto): Promise<Element>;
    update(id: number, updateElementDto: UpdateElementDto): Promise<Element>;
    remove(id: number): Promise<void>;
    findByVersionId(versionId: number): Promise<Element[]>;
}
