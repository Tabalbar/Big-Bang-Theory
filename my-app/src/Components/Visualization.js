import React, {useState, useRef} from "react";
import {Canvas, extend, useFrame, useThree} from "react-three-fiber";
import _ from "lodash";
import Sphere from "../Objects/Sphere";
import ToolbarWrapper from "./ToolbarWrapper";
import {planetInfo} from '../PlanetData'
import {starInfo} from '../StarData'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import CameraControls from "../HelperFunctions/CameraControls";




function Visualization(
    {}
) {

    const [cameraPosition, setCameraPosition] = useState({x: 0, y: 0, z: 0});
    const [cameraMoving, setCameraMoving] = useState(false);
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
            z: 9500
        };

        setCameraPosition(tmpCameraPosition);
        setCameraMoving(true)
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
                        ))},
                  {
                          _.times(starInfo.length, (i) => (
                          <Sphere
                          color={starInfo[i].color}
                          size={starInfo[i].size}
                          indexNum={i}
                          position={starInfo[i].position}
                          updatePosition={updatePosition}
                          cameraPosition={cameraPosition}
                          cameraMoving={cameraMoving}
                          setCameraMoving={setCameraMoving}
                          />
                        ))
                    }
                    {
                        cameraMoving ?
                            null
                            :
                            <CameraControls
                                cameraPosition={cameraPosition}
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
