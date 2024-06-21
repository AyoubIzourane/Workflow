import { ElementService } from './element.service';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
export declare class ElementController {
    private readonly elementService;
    constructor(elementService: ElementService);
    findAll(): Promise<import("./interface/Element").Element[]>;
    findOne(id: number): Promise<import("./interface/Element").Element>;
    create(createElementDto: CreateElementDto): Promise<import("./interface/Element").Element>;
    update(id: number, updateElementDto: UpdateElementDto): Promise<import("./interface/Element").Element>;
    remove(id: number): Promise<void>;
    findByVersionId(versionId: number): Promise<import("./interface/Element").Element[]>;
}
