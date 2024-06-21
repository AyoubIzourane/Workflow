import { Repository } from 'typeorm';
import { Link } from './interface/Link';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
export declare class LinkService {
    private readonly linkRepository;
    constructor(linkRepository: Repository<Link>);
    findAll(): Promise<Link[]>;
    findOne(id: number): Promise<Link>;
    create(createLinkDto: CreateLinkDto): Promise<Link>;
    update(id: number, updateLinkDto: UpdateLinkDto): Promise<Link>;
    remove(id: number): Promise<void>;
    findByVersionId(versionId: number): Promise<Link[]>;
}
