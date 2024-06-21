import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Link } from '../../Link/interface/Link'; // Update the path if necessary
import { Element } from '../../Element/interface/Element'; // Update the path if necessary
import { Version } from 'src/admin/version/interface/version';

@Entity({ name: "nodeDataArray" })
export class Node {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    category: string;

    @Column()
    text: string;

    @Column()
    key: number; 

    @Column()
    loc: string;

    @ManyToOne(() => Version, version => version.elements)
    @JoinColumn({ name: "versionId", referencedColumnName: "id" })
    version: Version;

}
