import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Node } from '../../Node/interface/Node';
import { Version } from 'src/admin/version/interface/version';

@Entity({ name: "linkDataArray" })
export class Link {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from: number;

    @Column()
    to: number;

    @Column({ type: 'simple-array', nullable: true })
    points: number[];

    @ManyToOne(() => Version, version => version.elements)
    @JoinColumn({ name: "versionId", referencedColumnName: "id" })
    version: Version;
}
 