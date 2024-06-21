import { FormulaireService } from './formulaire.service';
import { CreateFormulaireDto } from './dto/create-formulaire.dto';
import { UpdateFormulaireDto } from './dto/update-formulaire.dto';
export declare class FormulaireController {
    private readonly formulaireService;
    constructor(formulaireService: FormulaireService);
    findAll(): Promise<import("./interface/Formulaire").Formulaire[]>;
    findOne(id: number): Promise<import("./interface/Formulaire").Formulaire>;
    create(createFormulaireDto: CreateFormulaireDto): Promise<import("./interface/Formulaire").Formulaire>;
    update(id: number, updateFormulaireDto: UpdateFormulaireDto): Promise<import("./interface/Formulaire").Formulaire>;
    remove(id: number): Promise<void>;
}
