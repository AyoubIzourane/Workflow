import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './interface/Link';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Injectable()
export class LinkService {
    constructor(
        @InjectRepository(Link)
        private readonly linkRepository: Repository<Link>,
    ){}

    async findAll(): Promise<Link[]> {
        return this.linkRepository.find({
            relations: [] // Update relation names
        });
    }    

    async findOne(id: number): Promise<Link> {
        const link = await this.linkRepository.findOne({
            relations: [], // Update relation names
            where: { id }
        });
        if (!link) {
            throw new NotFoundException(`Link with ID ${id} not found`);
        }
        return link;
    }  
    
    async create(createLinkDto: CreateLinkDto) {
        // Extract from and to from the DTO and create the corresponding objects
        const from = { id: createLinkDto.from };
        const to = { id: createLinkDto.to };

        // Create a new link entity using the DTO and the extracted objects
        const newLink = await this.linkRepository.create({
            ...createLinkDto,
        });
        
        // Save and return the newly created link
        return this.linkRepository.save(newLink);
    }
    

    async update(id: number, updateLinkDto: UpdateLinkDto) {
        // Preload the link entity with the provided update DTO
        const link = await this.linkRepository.preload({
            id: +id,
            ...updateLinkDto,
        });
        if (!link) {
            throw new NotFoundException(`Link with ID ${id} not found`);
        }
        
        // Save and return the updated link
        return this.linkRepository.save(link);
    }
    

    async remove(id: number) {
        // Find the link by ID
        const link = await this.linkRepository.findOne({
            where: { id }
        });
        if (!link) {
            throw new NotFoundException(`Link with ID ${id} not found`);
        }
        
        // Delete the link
        await this.linkRepository.remove(link);
    }
    async findByVersionId(versionId: number): Promise<Link[]> {
        return this.linkRepository.createQueryBuilder('link')
            .leftJoinAndSelect('link.version', 'version')
            .where('version.id = :versionId', { versionId })
            .getMany();
    }
}
