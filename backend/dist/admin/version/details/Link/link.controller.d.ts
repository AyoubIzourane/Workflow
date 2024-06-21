import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
export declare class LinkController {
    private readonly linkService;
    constructor(linkService: LinkService);
    findAll(): Promise<import("./interface/Link").Link[]>;
    findOne(id: number): Promise<import("./interface/Link").Link>;
    create(createLinkDto: CreateLinkDto): Promise<import("./interface/Link").Link>;
    update(id: number, updateLinkDto: UpdateLinkDto): Promise<import("./interface/Link").Link>;
    remove(id: number): Promise<void>;
    findByVersionId(versionId: number): Promise<import("./interface/Link").Link[]>;
}
