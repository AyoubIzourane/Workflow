import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { EntitePrimaire } from '../../entitePrimaire/interface/entitePrimaire';
import { Version } from '../../version/interface/version';

@Entity()
export class Workflow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    titre: string;

    @Column({ nullable: true })
    prefixe: string;

    @Column({ nullable: true })
    status: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => EntitePrimaire)
    @JoinColumn({ name: "entitePrimaireId", referencedColumnName: "id" }) 
    entitePrimaire: EntitePrimaire;

    @OneToMany(() => Version, version => version.workflow)
    versions: Version[];

    @Column({ default: false, nullable: true })
    default: boolean;
}
