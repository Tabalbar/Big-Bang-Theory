import React from "react";
import {Canvas} from "react-three-fiber";
import _ from "lodash";
import {planetInfo} from "../PlanetData";
import Sphere from "../Objects/Sphere";
import starInfo from "../newStarData";
import Star from "../Objects/Star";
import StarArrow from "../Objects/StarArrow";
import {Button, Grid, Message, List, Header} from "semantic-ui-react";

//todo define what the wrapper will look like in here
function Toolbar(
    {
        handleHomeButton,
        focusDescription,
        updateStarPosition,
        handleToggleLines,
        cameraPosition
    }
) {

    return (
        <>
            <div style={{marginTop: -20}}/>
            <Header as='h5'>Camera is looking at position {'<'}{cameraPosition.x}, {cameraPosition.y}, {cameraPosition.z}{'>'}</Header>
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

            <div className= 'legend'>
                <div className="grid-item">Star Color</div>
                <div className="grid-item-r">Red</div>
                <div className="grid-item-o">Orange</div>
                <div className="grid-item-y">Yellow</div>
                <div className="grid-item-yw">Yellow White</div>
                <div className="grid-item-w">White</div>
                <div className="grid-item-bw">Blue White</div>
                <div className="grid-item-b">Blue</div>
                <div className="grid-item">Surface Temp</div>
                <div className="grid-item">less than 3,700 K</div>
                <div className="grid-item">3,700-5,200 K</div>
                <div className="grid-item">5,200-6,000 K</div>
                <div className="grid-item">6,000-7,500 K</div>
                <div className="grid-item">7,500-10,000K</div>
                <div className="grid-item">10,000-30,000K</div>
                <div className="grid-item">greater than 33,000K</div>
            </div>


            <div className='miniMap'>
                <Canvas
                    camera={{far: 10000000, position: [0, 0, 3000], fov: 75, near: 100}}
                >
                    <ambientLight/>
                    <pointLight position={[10, 10, 10]}/>
                    <Sphere
                        color={planetInfo[0].color}
                        size={[100,100,100]}
                        indexNum={0}
                        position={planetInfo[0].position}
                    />
                    {
                        _.times(starInfo.length, (i) => (
                            <>
                                <Star
                                    color={starInfo[i].color}
                                    size={[1,1,1]}
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
