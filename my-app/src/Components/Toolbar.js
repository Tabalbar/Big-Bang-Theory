import React, {useState} from "react";
import Modal from 'react-modal';
import {Canvas} from "react-three-fiber";
import _ from "lodash";
import {planetInfo} from "../PlanetData";
import Sphere from "../Objects/Sphere";
import starInfo from "../newStarData";
import Star from "../Objects/Star";
import StarArrow from "../Objects/StarArrow";
import {Button, Grid, Container, List, Header, Form} from "semantic-ui-react";

//todo define what the wrapper will look like in here
function Toolbar(
    {
        handleHomeButton,
        focusDescription,
        updateStarPosition,
        handleToggleLines,
        cameraPosition,
        parallaxLimit,
        handleSetParallax,
        bookmarkList,
        goToBookmarkedStar
    }
) {
    const[modalIsOpen, setModalIsOpen] = useState(true)
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
                        <Grid.Row columns={3}>
                                <Button color='yellow' style={{color: 'black'}} onClick={handleHomeButton}>Back to Sun</Button>
                            <Grid.Column>
                                <Header inverted as='h5' textAlign='center'>Camera is looking at
                                    position {'<'}{cameraPosition.x}, {cameraPosition.y}, {cameraPosition.z}{'>'}</Header>
                            </Grid.Column>
                            <Grid.Column>
                                <Form inverted>
                                    <Form.Input
                                        label={`View of Stars from Origin: Parallax = ` + parallaxLimit}
                                        min={0}
                                        max={30}
                                        onChange={handleSetParallax}
                                        step={1}
                                        type='range'
                                        value={parallaxLimit}
                                    />
                                </Form>
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
                <div className="grid-item">less than 3,700 K</div>
                <div className="grid-item">3,700-5,200 K</div>
                <div className="grid-item">5,200-6,000 K</div>
                <div className="grid-item">6,000-7,500 K</div>
                <div className="grid-item">7,500-10,000K</div>
                <div className="grid-item">10,000-30,000K</div>
                <div className="grid-item">greater than 33,000K</div>
            </div>

            <div>
                <Modal isOpen={modalIsOpen} portalClassName="modal">
                    <button class="mini basic red circular ui icon button" onClick={() => setModalIsOpen(false)}>
                       <i class="x icon"></i>
                    </button>
                    <h1 className="modalHeader">
                        About
                    </h1>
                    <p className="modalText">
                        Text
                    </p>
                </Modal>
            </div>




            {/*<div className='miniMap'>*/}
            {/*    <Canvas*/}
            {/*        camera={{far: 10000000, position: [0, 0, 100], fov: 75}}*/}
            {/*    >*/}
            {/*        <ambientLight/>*/}
            {/*        <pointLight position={[10, 10, 10]}/>*/}
            {/*        <Sphere*/}
            {/*            color={planetInfo[0].color}*/}
            {/*            size={[1,1,1]}*/}
            {/*            indexNum={0}*/}
            {/*            position={planetInfo[0].position}*/}
            {/*        />*/}
            {/*        {*/}
            {/*            _.times(starInfo.length, (i) => (*/}
            {/*                <>*/}
            {/*                    <Star*/}
            {/*                        color={starInfo[i].color}*/}
            {/*                        size={[1,1,1]}*/}
            {/*                        indexNum={i}*/}
            {/*                        position={starInfo[i].position}*/}
            {/*                        temperature={starInfo[i].temperature}*/}
            {/*                        velocityDirection={starInfo[i].velocityDirection}*/}
            {/*                    />*/}

            {/*                </>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*        {*/}
            {/*            _.times(starInfo.length, (i) => (*/}
            {/*                <>*/}
            {/*                    <StarArrow*/}
            {/*                        position={starInfo[i].position}*/}
            {/*                        velocityDirection={starInfo[i].velocityDirection}*/}
            {/*                    />*/}

            {/*                </>*/}
            {/*            ))*/}
            {/*        }*/}
            {/*    </Canvas>*/}
            {/*</div>*/}
        </>
    )
}

export default Toolbar
