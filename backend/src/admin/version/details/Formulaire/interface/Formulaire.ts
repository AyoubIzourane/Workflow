import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Element } from '../../Element/interface/Element';

@Entity()
export class Formulaire {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    formulaireValues: string;

    @Column()
    resultat: boolean;

    @Column()
    nextNode: number;

    @ManyToOne(() => Element, element => element.formulaires)
    @JoinColumn({ name: "elementId", referencedColumnName: "id" })
    element: Element;
}
