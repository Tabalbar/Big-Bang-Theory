import React, {useState, useRef} from "react";
import {Canvas, extend, useFrame, useThree} from "react-three-fiber";
import _ from "lodash";
import Sphere from "../Objects/Sphere";
import ToolbarWrapper from "./ToolbarWrapper";
import {planetInfo} from '../PlanetData'
import {starInfo} from '../StarData'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import CameraControls from "../HelperFunctions/CameraControls";
import Star from "../Objects/Star";
import StarArrow from "../Objects/StarArrow";


function Visualization(
    {}
) {

    const [cameraPosition, setCameraPosition] = useState({x: 0, y: 0, z: 0});
    const [cameraMoving, setCameraMoving] = useState(false);
    const [cameraMovingToHome, setCameraMovingToHome] = useState(false);
    const [focusDescription, setFocusDescription] = useState({
        name: 'Sun',
        funFact: 'A very small star',
        notable: true,
        realPosition: 'X =-9.256536737968663 E+05, Y = 9.520686612116818 E+05, Z = 1.366316508862237 E+04',
        temperature: '5772 K',
        brightness: 'N/A',
        realSize: 'Volume: 10^12 km^3',
        realColor: 'Yellow'
    });


    const handleHomeButton = () => {
        const tmpCameraPosition = {
            x: 0,
            y: 0,
            z: 0
        };
        setFocusDescription({
            name: 'Sun',
            funFact: 'A very small star',
            notable: true,
            realPosition: 'X =-9.256536737968663 E+05, Y = 9.520686612116818 E+05, Z = 1.366316508862237 E+04',
            temperature: '5772 K',
            brightness: 'N/A',
            realSize: 'Volume: 10^12 km^3',
            realColor: 'Yellow'
        });
        setCameraPosition(tmpCameraPosition);
        setCameraMovingToHome(true)
    };

    const updatePosition = (indexNum) => {
        const tmpCameraPosition = {
            x: planetInfo[indexNum].position[0],
            y: planetInfo[indexNum].position[1],
            z: planetInfo[indexNum].position[2]
        };

        setCameraPosition(tmpCameraPosition);
        setCameraMoving(true)
        setFocusDescription({
            name: planetInfo[indexNum].name,
            funFact: planetInfo[indexNum].funFact,
            notable: planetInfo[indexNum].notable,
            realPosition: planetInfo[indexNum].realPosition,
            temperature: planetInfo[indexNum].temperature,
            brightness: planetInfo[indexNum].brightness,
            realSize: planetInfo[indexNum].realSize,
            realColor: planetInfo[indexNum].realColor
        })
    };

    const updateStarPosition = (indexNum) => {
        console.log(indexNum)
        const tmpCameraPosition = {
            x: starInfo[indexNum].position[0],
            y: starInfo[indexNum].position[1],
            z: starInfo[indexNum].position[2]
        };

        setCameraPosition(tmpCameraPosition);
        setCameraMoving(true)
        setFocusDescription({
            name: starInfo[indexNum].name,
            funFact: starInfo[indexNum].funFact,
            notable: starInfo[indexNum].notable,
            realPosition: starInfo[indexNum].realPosition,
            temperature: starInfo[indexNum].temperature,
            brightness: starInfo[indexNum].brightness,
            realSize: starInfo[indexNum].realSize,
            realColor: starInfo[indexNum].realColor
        })
    };

    return (
        <>
            <div className='mainVisualization'>
                <Canvas
                    camera={{far: 10000000000, position: [0, 0, 10000], fov: 75}}
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
                                updatePosition={updatePosition}
                                cameraPosition={cameraPosition}
                                cameraMoving={cameraMoving}
                                setCameraMoving={setCameraMoving}
                            />
                        ))
                    },
                    {
                        _.times(starInfo.length, (i) => (
                            <>
                            <Star
                                color={starInfo[i].color}
                                size={starInfo[i].size}
                                indexNum={i}
                                position={starInfo[i].position}
                                updateStarPosition={updateStarPosition}
                                cameraPosition={cameraPosition}
                                cameraMoving={cameraMoving}
                                setCameraMoving={setCameraMoving}
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
                    {
                        cameraMoving ?
                            null
                            :
                            <CameraControls
                                cameraPosition={cameraPosition}
                                cameraMoving={cameraMoving}
                                setCameraMoving={setCameraMoving}
                                cameraMovingToHome={cameraMovingToHome}
                                setCameraMovingToHome={setCameraMovingToHome}
                            />
                    }


                </Canvas>
                <ToolbarWrapper
                    handleHomeButton={handleHomeButton}
                    focusDescription={focusDescription}

                />
            </div>
        </>
    )
}


export default Visualization
