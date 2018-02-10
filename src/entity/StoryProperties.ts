import { Entity, Column, ManyToOne } from "typeorm";
import { Stories } from './Stories';
import { StoryPropertyNames } from './StoryPropertyNames';

@Entity()
export class StoryProperties {

    @Column()
    value: string;

    @ManyToOne(type => StoryPropertyNames, storyPropName => storyPropName.storyProperties, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true,
        primary: true
    })
    storyPropName: StoryPropertyNames;

    @ManyToOne(type => Stories, story => story.storyProperties, {
        primary: true
    })
    story: Stories;
}
