import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert, OneToMany } from 'typeorm';
import { Workflow } from '../../workflow/interface/workflow';
import { Element } from '../details/Element/interface/Element'; 
import { Node } from '../details/Node/interface/Node'; 
import { Link } from '../details/Link/interface/Link'; 

@Entity()
export class Version {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    titre: string;

    @Column({ nullable: true })
    status: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true, type: 'date' })
    createdAt: Date;

    @Column({ default: false, nullable: true })
    default: boolean;

    @Column({ nullable: true })
    versionNumber: number;

    @ManyToOne(() => Workflow, workflow => workflow.versions)
    @JoinColumn({ name: "workflowId", referencedColumnName: "id" })
    workflow: Workflow;

    @OneToMany(() => Element, element => element.version)
    elements: Element[];
    
    @OneToMany(() => Node, node => node.version)
    nodes: Node[];

    @OneToMany(() => Link, link => link.version)
    links: Link[];

    @BeforeInsert()
    setDefaults() {
        this.createdAt = new Date();
        this.status = "Brouillon";
    }
}
