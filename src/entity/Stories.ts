import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { StoryProperties } from './StoryProperties';

@Entity()
export class Stories {

    @PrimaryGeneratedColumn()
    storyId: number;

    @Column()
    name: string;

    @OneToMany(type => StoryProperties, storyProperty => storyProperty.story, {
        cascadeInsert: true,
        cascadeUpdate: true
    })
    storyProperties: StoryProperties[];
}

