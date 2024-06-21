import { Module } from '@nestjs/common';
import { EntitePrimaireController } from './entitePrimaire.controller';
import { EntitePrimaireService } from './entitePrimaire.service';
import { EntitePrimaire } from './interface/entitePrimaire';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports:[TypeOrmModule.forFeature([EntitePrimaire])],
  controllers: [EntitePrimaireController],
  providers: [EntitePrimaireService],
  exports: [TypeOrmModule],
})
export class EntitePrimaireModule {}
