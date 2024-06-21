import { NodeService } from './node.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
export declare class NodeController {
    private readonly nodeService;
    constructor(nodeService: NodeService);
    findAll(): Promise<import("./interface/Node").Node[]>;
    findOne(id: number): Promise<import("./interface/Node").Node>;
    create(createNodeDto: CreateNodeDto): Promise<import("./interface/Node").Node>;
    update(id: number, updateNodeDto: UpdateNodeDto): Promise<import("./interface/Node").Node>;
    remove(id: number): Promise<void>;
    findByVersionId(versionId: number): Promise<import("./interface/Node").Node[]>;
}
