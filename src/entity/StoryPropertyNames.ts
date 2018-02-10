import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Stories as Story } from './Stories';
import { StoryProperties } from './StoryProperties';

@Entity()
export class StoryPropertyNames {

    @PrimaryGeneratedColumn()
    propertyNameId: number;

    @Column({ unique: true })
    propertyName: string;

    @OneToMany(type => StoryPropertyNames, storyPropertyName => storyPropertyName.propertyName, {
        cascadeInsert: true,
        cascadeUpdate: true
    })
    storyProperties: StoryProperties[];

}
