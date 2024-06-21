import { Repository } from 'typeorm';
import { Formulaire } from './interface/Formulaire';
import { CreateFormulaireDto } from './dto/create-formulaire.dto';
import { UpdateFormulaireDto } from './dto/update-formulaire.dto';
export declare class FormulaireService {
    private readonly formulaireRepository;
    constructor(formulaireRepository: Repository<Formulaire>);
    findAll(): Promise<Formulaire[]>;
    findOne(id: number): Promise<Formulaire>;
    create(formulaire: CreateFormulaireDto): Promise<Formulaire>;
    update(id: number, formulaire: UpdateFormulaireDto): Promise<Formulaire>;
    remove(id: number): Promise<void>;
}
