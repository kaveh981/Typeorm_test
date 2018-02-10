import "reflect-metadata";
import { createConnection } from "typeorm";
import { Stories } from "./entity/Stories";
import { StoryProperties } from "./entity/StoryProperties";
import { StoryPropertyNames } from "./entity/StoryPropertyNames";

createConnection().then(async connection => {

    let story = {
        name: "fereidouni",
        properties: [
            {
                "property": "prop 1", "value": "value 1"
            },
            {
                "property": "prop 2", "value": "value 2"
            }
        ]
    }

    let newStory = new Stories();
    newStory.name = story.name;
    let newStoryProperties: StoryProperties[] = [];
    story.properties.forEach(async property => {
        let newStoryProperty = new StoryProperties();
        let newStoryPropertyName = new StoryPropertyNames();
        newStoryPropertyName.propertyName = property.property;
        newStoryProperty.storyPropName = newStoryPropertyName;
        newStoryProperty.value = property.value;
    /* if I comment out the line right bellow this comment the storyProperties won't be saved and returns an error saying:
       ER_NO_DEFAULT_FOR_FIELD: Field 'storyStoryId' doesn't have a default value
       and if I uncomment it every thing will be saved into database but the return result has circular structure
       the desired beheaviour is that only one way inserting should be enough and not required to have this line */
        
        newStoryProperty.story = newStory;

        newStoryProperties.push(newStoryProperty);
        console.log(newStoryProperty);
    });
    console.log(newStory);
    newStory.storyProperties = newStoryProperties
    let result: Stories = await connection.manager.save(newStory);
    console.log(JSON.stringify(result));
    console.log(result);
    return result;

}).catch(error => console.log('some error: ' + error));
