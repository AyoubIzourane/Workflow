import { Module } from '@nestjs/common';
import { FormulaireController } from './formulaire.controller';
import { FormulaireService } from './formulaire.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formulaire } from './interface/Formulaire';

@Module({
    imports: [TypeOrmModule.forFeature([Formulaire])],
    controllers: [FormulaireController],
    providers: [FormulaireService],
    exports: [TypeOrmModule],
})
export class FormulaireModule {}
