import React, {useRef} from "react";
import {Canvas, useFrame, useThree} from "react-three-fiber";
import _ from "lodash";
import {planetInfo} from "../PlanetData";
import Sphere from "../Objects/Sphere";
import starInfo from "../newStarData";
import Star from "../Objects/Star";
import StarArrow from "../Objects/StarArrow";
import {Button, Grid, Container, List, Header, Label} from "semantic-ui-react";
import InputRange from "react-input-range";
import Slider from "@material-ui/core/Slider";
import {Radio} from "framework7-react";
import {Checkbox} from "@material-ui/core";
import CompassObject from "../Objects/CompassObject";
import CameraControls from "../HelperFunctions/CameraControls";
import Visualization from "./Visualization";


//todo define what the wrapper will look like in here
function Toolbar(
    {
        handleHomeButton,
        cameraMoving,
        setCameraMoving,
        cameraMovingToHome,
        setCameraMovingToHome,
        cameraPosition,
        distanceValues,
        handleSetDistanceValues,
        bookmarkList,
        // goToBookmarkedStar,
        removeStarFromList,
        handleSetFilterValues,
        filterValues,
        handleSetVelMagValues,
        velMagValues,
        toggleVel,
        handleToggleVel
    }
) {


    // Ref to the controls, so that we can update them on every frame using useFrame

    return (
        <>
            {/*<Grid centered={true}>*/}
            {/*    <Grid.Row columns={3}>*/}
            {/*        <Grid.Column>*/}
            {/*            <Message color='blue'>*/}
            {/*                <p>*/}
            {/*                    <strong style={{fontSize: 40}}>{focusDescription.name}</strong><br/><br/>*/}
            {/*                    <b>Description:</b> {focusDescription.funFact}<br/>*/}
            {/*                    <b>Ra: </b>{focusDescription.ra} Deg<br/>*/}
            {/*                    <b>Dec: </b>{focusDescription.dec} Deg <br/>*/}
            {/*                    <b>Distance: </b>{focusDescription.distance} Light years<br/>*/}
            {/*                    <b>Temperature:</b> {focusDescription.temperature} K<br/>*/}
            {/*                    <b>Brightness:</b> {focusDescription.brightness}<br/>*/}
            {/*                    <b>Size:</b> {focusDescription.realSize}<br/>*/}
            {/*                    <b>Color:</b> {focusDescription.realColor}*/}
            {/*                </p>*/}

            {/*            </Message>*/}
            {/*        </Grid.Column>*/}

            {/*        <Grid.Column>*/}
            {/*            <div className='starsList'>*/}

            {/*<List divided verticalAlign='middle'>*/}
            {/*    <List.Item>*/}
            {/*        <List.Content floated='right'>*/}
            {/*            <Button onClick={handleHomeButton}>Go</Button>*/}
            {/*        </List.Content>*/}
            {/*        <List.Content>*/}
            {/*            Sun*/}
            {/*        </List.Content>*/}
            {/*    </List.Item>*/}
            {/*    {*/}
            {/*        starInfo.map((value, index) => {*/}
            {/*            return (*/}

            {/*                value.notable ?*/}
            {/*                    value.parallax >= parallaxLimit ?*/}
            {/*                        <List.Item>*/}
            {/*                            <List.Content floated='right'>*/}
            {/*                                <Button*/}
            {/*                                    onClick={() => updateStarPosition(index)}>Go</Button>*/}
            {/*                            </List.Content>*/}
            {/*                            <List.Content>*/}
            {/*                                {value.name}*/}
            {/*                            </List.Content>*/}
            {/*                        </List.Item>*/}
            {/*                        :*/}
            {/*                        null*/}
            {/*                    :*/}
            {/*                    null*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*</List>*/}
            {/*            </div>*/}

            {/*        </Grid.Column>*/}

            {/*        <Grid.Column>*/}
            {/*            <Button onClick={handleToggleLines}>Toggle Star Lines</Button>*/}


            <div className='toolBar'>
                <Container>
                    <Grid>
                        .
                        <Grid.Row columns={6}>
                            <Grid.Column>
                                <Button color='yellow' style={{color: 'black'}} onClick={handleHomeButton}>Back to
                                    Sun</Button>
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h5' textAlign='center'>Camera is looking at
                                    position<br/> {'<'}{cameraPosition.x}, {cameraPosition.y}, {cameraPosition.z}{'>'}
                                </Header>
                            </Grid.Column>
                            <Grid.Column>

                                <p style={{textAlign: 'center'}}>
                                    Distance<br/> {filterValues.distance[0]} to {filterValues.distance[1]}
                                </p>
                                <Slider
                                    value={distanceValues}
                                    onChange={handleSetDistanceValues}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    max={3216}
                                />
                                {/*/>*/}
                            </Grid.Column>
                            <Grid.Column>
                                <p style={{textAlign: 'center'}}>
                                    Velocity
                                    Magnitude<br/> {filterValues.velMag[0]} to {filterValues.velMag[1]}
                                </p>
                                <Slider
                                    value={velMagValues}
                                    onChange={handleSetVelMagValues}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    max={9821}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Checkbox
                                    checked={toggleVel}
                                    label="Primary"
                                    onChange={handleToggleVel}
                                    color='primary'
                                    labelPlacement="start"
                                />
                                Velocity Arrows
                            </Grid.Column>

                            <Grid.Column>
                                <Button onClick={handleSetFilterValues}>Filter</Button>
                            </Grid.Column>

                        </Grid.Row>


                    </Grid>
                </Container>
            </div>
            {/*        </Grid.Column>*/}
            {/*    </Grid.Row>*/}

            {/*</Grid>*/}
            <div className='bookmarkList'>
                <Header inverted as='h1'>
                    Bookmarked Stars:
                </Header>
                <List divided verticalAlign='middle'>
                    {
                        bookmarkList.map((value, index) => {
                            return (
                                <List.Item>
                                    <List.Content floated='right'>
                                        <Button
                                            // onClick={() => goToBookmarkedStar(index)}>Go
                                            onClick={() => removeStarFromList(index)}>Remove
                                        </Button>
                                    </List.Content>
                                    <List.Content>{value.name}</List.Content>
                                    <List.Content>{value.distance}</List.Content>
                                    <List.Content>{value.temperature}</List.Content>
                                    <List.Content>{value.velMag}</List.Content>
                                </List.Item>

                            )
                        })
                    }
                </List></div>
            <div className='legend'>
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


            {/*<div className='miniMap'>*/}
            {/*    <Canvas*/}
            {/*        camera={{far: 10000000, position: [0, 0, 3], fov: 75}}*/}
            {/*    >*/}
            {/*        <ambientLight/>*/}
            {/*        <pointLight position={[10, 10, 10]}/>*/}
            {/*        <CompassObject*/}
            {/*        cameraPosition={cameraPosition}*/}
            {/*        />*/}
            {/*        <CameraControls*/}
            {/*            cameraPosition={cameraPosition}*/}
            {/*            cameraMoving={cameraMoving}*/}
            {/*            setCameraMoving={setCameraMoving}*/}
            {/*            cameraMovingToHome={cameraMovingToHome}*/}
            {/*            setCameraMovingToHome={setCameraMovingToHome}*/}
            {/*        />*/}

            {/*    </Canvas>*/}
            {/*</div>*/}
        </>
    )
}

export default Toolbar
