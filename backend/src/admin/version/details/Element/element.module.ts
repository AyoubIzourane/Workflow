import { Module } from '@nestjs/common';
import { ElementController } from './element.controller';
import { ElementService } from './element.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from './interface/Element';
import { FormulaireModule } from '../Formulaire/formulaire.module';

@Module({
    imports: [TypeOrmModule.forFeature([Element]),
    FormulaireModule,],
    controllers: [ElementController],
    providers: [ElementService],
    exports: [TypeOrmModule],
})
export class ElementModule {}
