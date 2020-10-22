import React from "react";
import {Canvas} from "react-three-fiber";
import _ from "lodash";
import Sphere from "../Objects/Sphere";
import {OrbitControls} from "drei";
import ToolbarWrapper from "./ToolbarWrapper";
import {planetInfo} from '../PlanetData'

function Visualization(
    {
    }
) {
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
                                position={planetInfo[i].position}
                            />
                        ))
                    }
                    <OrbitControls/>
                </Canvas>
                <ToolbarWrapper/>
            </div>
        </>
    )
}

export default Visualization
