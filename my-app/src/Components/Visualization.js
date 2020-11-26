import React, {useState, useRef} from "react";
import {Canvas, extend, useFrame, useThree} from "react-three-fiber";
import _ from "lodash";
import Sphere from "../Objects/Sphere";
import ToolbarWrapper from "./ToolbarWrapper";
import {planetInfo} from '../PlanetData'
import starInfo from '../newStarData'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import CameraControls from "../HelperFunctions/CameraControls";
import Star from "../Objects/Star";
import StarArrow from "../Objects/StarArrow";
import Selected from "../Objects/Selected";
import Pin from "../Objects/Pin";
import * as THREE from "three";


function Visualization(
    {}
) {

    const [cameraPosition, setCameraPosition] = useState({x: 0, y: 0, z: 0});
    const [cameraMoving, setCameraMoving] = useState(false);
    const [active, setActive] = useState(false);
    const [cameraMovingToHome, setCameraMovingToHome] = useState(false);
    const [selectedPosition ,setSelectedPosition] = useState({x: 0, y: 0, z:0})
    const [selectedSize, setSelectedSize] = useState({innerRadius: planetInfo[0].size[0]*3, outerRadius: planetInfo[0].size[1]*3, thetaSegments: planetInfo[0].size[2]})
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
    const [toggleLines, setToggleLines] = useState(true);


    const handleHomeButton = () => {
        const tmpCameraPosition = {
            x: 0,
            y: 0,
            z: 0
        };
        const tmpSelectedPosition = {
            x: planetInfo[0].position[0],
            y: planetInfo[0].position[1],
            z: planetInfo[0].position[2]
        };
        const tmpSelectedSize = {
            innerRadius: planetInfo[0].size[0]*3,
            outerRadius: planetInfo[0].size[1]*3,
            thetaSegments: planetInfo[0].size[2]
        };

        setSelectedSize(tmpSelectedSize)
        setSelectedPosition(tmpSelectedPosition)
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
        setToggleLines(true)
        setCameraMovingToHome(true)
    };


    const updateStarPosition = (indexNum) => {
        const tmpCameraPosition = {
            x: starInfo[indexNum].position[0],
            y: starInfo[indexNum].position[1],
            z: starInfo[indexNum].position[2]
        };
        const tmpSelectedPosition = {
            x: starInfo[indexNum].position[0],
            y: starInfo[indexNum].position[1],
            z: starInfo[indexNum].position[2]
        };
        const tmpSelectedSize = {
            innerRadius: starInfo[indexNum].size[0]*3,
            outerRadius: starInfo[indexNum].size[1]*3,
            thetaSegments: starInfo[indexNum].size[2]
        };
        setSelectedSize(tmpSelectedSize)

        setSelectedPosition(tmpSelectedPosition)
        setCameraPosition(tmpCameraPosition);
        setCameraMoving(true)
        setCameraMovingToHome(true)
        setToggleLines(false)
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

    const handleToggleLines = () => {
        setToggleLines(prevState => !prevState)
    }

    return (
        <>
            <div className='mainVisualization'>
                <Canvas
                    camera={{far: 10000000000, position: [0, 0, 2], fov: 50}}
                >
                    <ambientLight/>
                    <pointLight position={[10, 10, 10]}/>
                            <Sphere
                                color={planetInfo[0].color}
                                size={planetInfo[0].size}
                                indexNum={0}
                                position={planetInfo[0].position}
                                cameraPosition={cameraPosition}
                                cameraMoving={cameraMoving}
                                setCameraMoving={setCameraMoving}
                                setActive={setActive}
                                active={active}
                            />

                    <Selected
                        position={[selectedPosition.x, selectedPosition.y, selectedPosition.z]}
                        size={[selectedSize.innerRadius, selectedSize.outerRadius, 10000]}
                    />

                    {
                        _.times(starInfo.length, (i) => (
                            <>
                                <Star
                                    color={starInfo[i].color}
                                    size={[.1,.1,.1]}
                                    indexNum={i}
                                    position={starInfo[i].position}
                                    updateStarPosition={updateStarPosition}
                                    cameraPosition={cameraPosition}
                                    cameraMoving={cameraMoving}
                                    temperature={starInfo[i].temperature}
                                    setCameraMoving={setCameraMoving}
                                    velocityDirection={starInfo[i].velocityDirection}
                                    setActive={setActive}
                                    active={active}
                                />

                            </>
                        ))
                    }
                    {
                        toggleLines ?
                        _.times(starInfo.length, (i)=>(
                            <>
                                <Pin
                                    updateStarPosition={updateStarPosition}
                                    setActive={setActive}
                                    active={active}
                                    indexNum={i}
                                    position={[(1-.01)*selectedPosition.x+.01*starInfo[i].position[0],(1-.01)*selectedPosition.y+.01*starInfo[i].position[1],(1-.01)*selectedPosition.z+.01*starInfo[i].position[2]]}
                                    fromPosition={[new THREE.Vector3(starInfo[i].position[0],starInfo[i].position[1],starInfo[i].position[2]),new THREE.Vector3(selectedPosition.x,selectedPosition.y,selectedPosition.z)]}
                                />
                            </>
                        ))
                            :
                            null
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
                    updateStarPosition={updateStarPosition}
                    handleToggleLines={handleToggleLines}
                    cameraPosition={cameraPosition}
                />
            </div>
        </>
    )
}


export default Visualization
