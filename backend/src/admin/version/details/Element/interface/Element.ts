import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Node } from '../../Node/interface/Node';
import { Formulaire } from '../../Formulaire/interface/Formulaire';
import { Version } from 'src/admin/version/interface/version';

@Entity()
export class Element {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key:number;

    @Column()
    titre: string;

    @Column({ nullable: true })
    approbateur: string;

    @Column({ nullable: true })
    escalader: boolean;

    @Column({ nullable: true })
    delaiEscalade: number;

    @Column()
    workflow: string;

    @Column({ nullable: true })
    resultat: boolean;

    @OneToMany(() => Formulaire, formulaire => formulaire.element)
    formulaires: Formulaire[];

    @ManyToOne(() => Version, version => version.elements)
    @JoinColumn({ name: "versionId", referencedColumnName: "id" })
    version: Version;
}
