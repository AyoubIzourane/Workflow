import { Injectable, NotFoundException } from '@nestjs/common';
import { EntitePrimaire } from './interface/entitePrimaire';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateEntitePrimaireDto } from './dto/create-entitePrimaire.dto';
import { UpdateEntitePrimaireDto } from './dto/update-entitePrimaire.dto';

@Injectable()
export class EntitePrimaireService {
  private readonly entitePrimaire: EntitePrimaire[] = [];
  constructor(
    @InjectRepository(EntitePrimaire)
    private readonly entitePrimaireRepository :Repository<EntitePrimaire>,
    ){}

  async findAll(): Promise<EntitePrimaire[]>{
    return this.entitePrimaireRepository.find({
        relations:[]
    });
    }    

  async findOne( id: number) : Promise<EntitePrimaire>{
    const entitePrimaire = this.entitePrimaireRepository.findOne({
        relations:[],
        where:{id}
    }) ;
        if (!entitePrimaire) {
        throw new NotFoundException(`This entitePrimaire : ${id} not found`);
        }
        return entitePrimaire;
    }  
    
    async create(createEntitePrimaireDto: CreateEntitePrimaireDto) {
        
        const createEntitePrimaire = this.entitePrimaireRepository.create({
            ...createEntitePrimaireDto,
        });
        
        return this.entitePrimaireRepository.save(createEntitePrimaire);
        }

  async update(id: number,updateEntitePrimaireDto: UpdateEntitePrimaireDto) {
    const entitePrimaire = await this.entitePrimaireRepository.preload({
    id: +id,
    ...updateEntitePrimaireDto,
    })


    if (!entitePrimaire) {
    throw new NotFoundException(`This EntitePrimaire : ${id} not found`);
    }

    return this.entitePrimaireRepository.save(entitePrimaire);
}

  async remove(id: number) {
    const entitePrimaire = await this.entitePrimaireRepository.findOne({
        relations:[],
        where:{id}
    }) ;
    if (!entitePrimaire) {
        throw new NotFoundException(`entitePrimaire with ID ${id} not found`);
    }

    await this.entitePrimaireRepository.delete(id);
    }

   
}


