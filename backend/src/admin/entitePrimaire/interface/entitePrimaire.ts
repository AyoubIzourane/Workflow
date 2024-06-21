import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class EntitePrimaire {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    prefixe: string;

    @Column({ nullable: true })
    libelle: string;

    @Column({ nullable: true })
    startwith: number;

    @Column({ nullable: true })
    currentvalue: number;

    @Column({ nullable: true })
    databaseEntity: string;
  }
  