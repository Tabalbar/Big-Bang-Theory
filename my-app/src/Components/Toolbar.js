import React from "react";
import {Canvas} from "react-three-fiber";
import _ from "lodash";
import {planetInfo} from "../PlanetData";
import Sphere from "../Objects/Sphere";
import starInfo from "../newStarData";
import Star from "../Objects/Star";
import StarArrow from "../Objects/StarArrow";
import {Button, Grid, Message, List, Divider} from "semantic-ui-react";

//todo define what the wrapper will look like in here
function Toolbar(
    {
        handleHomeButton,
        focusDescription,
        updateStarPosition,
        handleToggleLines
    }
) {

    return (
        <>
            <br/>
            <Grid centered={true}>
                <Grid.Row columns={3}>
                    <Grid.Column>
                        <Message color='blue'>
                            <p>
                                <strong style={{fontSize: 40}}>{focusDescription.name}</strong><br/><br/>
                                <b>Description:</b> {focusDescription.funFact}<br/>
                                <b>Position:</b> {focusDescription.realPosition}<br/>
                                <b>Temperature:</b> {focusDescription.temperature}<br/>
                                <b>Brightness:</b> {focusDescription.brightness}<br/>
                                <b>Size:</b> {focusDescription.realSize}<br/>
                                <b>Color:</b> {focusDescription.realColor}
                            </p>

                        </Message>
                    </Grid.Column>

                    <Grid.Column>
                        <div className='starsList'>

                        <List divided verticalAlign='middle'>
                            <List.Item>
                                <List.Content floated='right'>
                                    <Button onClick={handleHomeButton}>Go</Button>
                                </List.Content>
                                <List.Content>
                                    Sun
                                </List.Content>
                            </List.Item>
                            {
                                starInfo.map((value, index) => {
                                    return (

                                        value.notable ?
                                            <List.Item>
                                                <List.Content floated='right'>
                                                    <Button onClick={() => updateStarPosition(index)}>Go</Button>
                                                </List.Content>
                                                <List.Content>
                                                    {value.name}
                                                </List.Content>
                                            </List.Item>
                                            :
                                            null
                                    )
                                })
                            }
                        </List>
                        </div>

                    </Grid.Column>

                    <Grid.Column>
                        <Button onClick={handleToggleLines}>Toggle Star Lines</Button>
                    </Grid.Column>
                </Grid.Row>

            </Grid>


            <div className='miniMap'>
                <Canvas
                    camera={{far: 10000000, position: [0, 0, 150000], fov: 75}}
                >
                    <ambientLight/>
                    <pointLight position={[10, 10, 10]}/>
                    {
                        _.times(planetInfo.length, (i) => (
                            <Sphere
                                color={planetInfo[i].color}
                                size={planetInfo[i].size}
                                indexNum={i}
                                position={planetInfo[i].position}
                            />
                        ))
                    }
                    {
                        _.times(starInfo.length, (i) => (
                            <>
                                <Star
                                    color={starInfo[i].color}
                                    size={starInfo[i].size}
                                    indexNum={i}
                                    position={starInfo[i].position}
                                    velocityDirection={starInfo[i].velocityDirection}
                                />

                            </>
                        ))
                    }
                    {
                        _.times(starInfo.length, (i) => (
                            <>
                                <StarArrow
                                    position={starInfo[i].position}
                                    velocityDirection={starInfo[i].velocityDirection}
                                />

                            </>
                        ))
                    }
                </Canvas>
            </div>
        </>
    )
}

export default Toolbar
