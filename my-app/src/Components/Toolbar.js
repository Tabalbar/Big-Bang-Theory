import React, {useRef, useState} from "react";
import Modal from 'react-modal';
import {Canvas, useFrame, useThree} from "react-three-fiber";
import _ from "lodash";
import {planetInfo} from "../PlanetData";
import Sphere from "../Objects/Sphere";
import starInfo from "../newStarData";
import Star from "../Objects/Star";
import StarArrow from "../Objects/StarArrow";
import {Button, Grid, Container, List, Header, Icon} from "semantic-ui-react";
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
        goToBookmarkedStar,
        handleSetFilterValues,
        filterValues,
        handleSetVelMagValues,
        velMagValues,
        toggleVel,
        handleToggleVel,
        handleBookmark
    }
) {


    // Ref to the controls, so that we can update them on every frame using useFrame
    const[modalIsOpen, setModalIsOpen] = useState(false)
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
                        <Grid.Row columns={8}>
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
                            <Grid.Column>
                                <Button onClick={handleBookmark} color='blue' icon >Bookmark <Icon color='yellow' name='star'/></Button>
                            </Grid.Column>
                            <Grid.Column floated={'right'}>
                                <Button circular icon onClick={() => setModalIsOpen(true)}>?</Button>
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
                                            onClick={() => goToBookmarkedStar(index)}>Go</Button>
                                    </List.Content>
                                    <List.Content>
                                        {value.name}
                                    </List.Content>
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
                <div className="grid-item"> &lt; 3,700 K</div>
                <div className="grid-item">3,700-5,200 K</div>
                <div className="grid-item">5,200-6,000 K</div>
                <div className="grid-item">6,000-7,500 K</div>
                <div className="grid-item">7,500-10,000K</div>
                <div className="grid-item">10,000-30,000K</div>
                <div className="grid-item">&gt; 33,000K</div>
            </div>


            <div className='legend-2'>
                <div className="grid-item"># of Arrows</div>
                <div className="grid-item">Velocity</div>
                <div className="grid-item">&gt;</div>
                <div className="grid-item">0-100km/s</div>
                <div className="grid-item">&gt;&gt;</div>
                <div className="grid-item">100-200km/s</div>
                <div className="grid-item">&gt;&gt;&gt;</div>
                <div className="grid-item">200-300km/s</div>
                <div className="grid-item">&gt;&gt;&gt;&gt;</div>
                <div className="grid-item">300-400km/s</div>
                <div className="grid-item">&gt;&gt;&gt;&gt;&gt;</div>
                <div className="grid-item">&gt;400km/s</div>
            </div>

            <div>
                <Modal isOpen={modalIsOpen} portalClassName="modal">
                    <button className="mini basic red circular ui icon button" onClick={() => setModalIsOpen(false)}>
                        <i className="x icon"></i>
                    </button>
                    <h1 className="modalHeader">
                        A 3D-Visualization of Stellar Bodies in the Milky Way
                    </h1>
                    <p className="modalText">
                        This visualization is an interactive 3-dimensional application to
                        view and understand the relative positions and motions of stars within our local vicinity of the Milky Way galaxy.
                        Data provided by The Global Astrometric Interferometer for Astrophysics, GAIA: a European space mission providing
                        astrometry, photometry, and spectroscopy of more than 1000 million stars in the Milky Way (1% of total stars in galaxy).
                        Raw data pulled from the second GAIA data release (2018)
                        Transformed into cartesian galactocentric values using Astro.py python packages
                    </p>
                    <h3 className="modalHeader">
                        How to use the visualization
                    </h3>
                    <p className="modalText">
                        Focus: Left click on a star to move the camera's position to that star.
                        The camera will now be focused the star's position. (The default focused star is the Earth’s sun).
                    </p>
                    <p className="modalText">
                        Pan: Click and hold the right mouse button to pan the camera through space.
                    </p>
                    <p className="modalText">
                        Rotation: Click and hold the left mouse button to change the camera's position around the focused star.
                    </p>
                    <p className="modalText">
                        Zoom: Scrolling the mouse wheel towards you will zoom the camera out and scrolling the mouse wheel forward will zoom the camera in.
                    </p>
                    <p className="modalText">
                        Filter: Use the options labeled “Distance” and “Velocity Magnitude” to filter the stars based on a min and max value.
                        Use the “”Velocity Arrow” checkbox to turn the star vectors on/off. When you are ready to filter the stars, click on the button labeled “Filter”.
                    </p>
                    <p className="modalText">
                        Bookmark: Click on the star you want to bookmark. Once the camera is focused on the star, use the blue star button in the toolbar to bookmark it.
                        The star’s description will appear on the left of the window.
                        You may use this table to compare star data and using the button labeled “Go” will move the camera to the bookmarked star’s position.
                        Using the Red X button will remove the star from the bookmarked list.

                    </p>
                    <p className="modalText">
                        You may return to the default view of the Earth's sun by clicking on the button labeled "Back to sun" and reopen this window by clicking
                        the button labeled "?."
                    </p>
                    <h3 className="modalHeader">
                        Credit
                    </h3>
                    <h3 className="modalCredit">
                        Created by: Roderick Tabalba, Jeff Kleyner, Kameron Wong, Christopher Nishimura
                    </h3>
                </Modal>
            </div>



        </>
    )
}

export default Toolbar
