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




    const updatePosition = (indexNum) => {
        const tmpCameraPosition = {
            x: planetInfo[indexNum].position[0],
            y: planetInfo[indexNum].position[1],
            z: planetInfo[indexNum].position[2]
        };

        setCameraPosition(tmpCameraPosition);
        setCameraMoving(true)
    };
    return (
        <>
            <div className='mainVisualization'>
                <Canvas
                    camera={{far: 10000, position: [0, 0, 50], fov: 50}}
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
                <ToolbarWrapper/>
            </div>
        </>
    )
}

export default Visualization
