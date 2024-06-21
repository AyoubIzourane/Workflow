import { Repository } from 'typeorm';
import { Version } from './interface/version';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { Element } from './details/Element/interface/Element';
import { Node } from './details/Node/interface/Node';
import { Link } from './details/Link/interface/Link';
import { Formulaire } from './details/Formulaire/interface/Formulaire';
import { UpdateVersionWithDetailsDto } from './dto/update-version-with-details.dto';
export declare class VersionService {
    private readonly versionRepository;
    private readonly elementRepository;
    private readonly nodeRepository;
    private readonly linkRepository;
    private readonly formulaireRepository;
    constructor(versionRepository: Repository<Version>, elementRepository: Repository<Element>, nodeRepository: Repository<Node>, linkRepository: Repository<Link>, formulaireRepository: Repository<Formulaire>);
    findAll(): Promise<Version[]>;
    findOne(id: number): Promise<Version>;
    create(createVersionDto: CreateVersionDto): Promise<Version>;
    updateWithDetails(id: number, updateVersionWithDetailsDto: UpdateVersionWithDetailsDto): Promise<Version>;
    update(id: number, updateVersionDto: UpdateVersionDto): Promise<Version>;
    remove(id: number): Promise<void>;
    findByWorkflowId(workflowId: number): Promise<Version[]>;
}
