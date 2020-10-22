import React from "react";
import Visualization from "../Components/Visualization";
import { Canvas } from 'react-three-fiber'
import {OrbitControls} from "drei";
import Box from "./Box";
import '../style.css'
import Sphere from "./Sphere";
import _ from "lodash"

function Main(){

    const planetInfo = [
        {
            color: 'yellow',
            size: [4,4,4],
            position: [0,0,0]
        },
        {
            color: 'grey',
            size: [.5,.5,.5],
            position: [5,0,0]
        },
        {
            color: 'brown',
            size: [.9,.9,.9],
            position: [10,0,0]
        },
        {
            color: 'blue',
            size: [1,1,1],
            position: [15,0,0]
        },
        {
            color: 'red',
            size: [.5,.5,.5],
            position: [20,0,0]
        },
        {
            color: 'brown',
            size: [3,3,3],
            position: [25,0,0]
        },
        {
            color: 'brown',
            size: [2,2,2],
            position: [30,0,0]
        },
        {
            color: 'green',
            size: [1.5,1.5,1.5],
            position: [35,0,0]
        },
        {
            color: 'blue',
            size: [2.5,2.5,2.5],
            position: [40,0,0]
        }
    ];

    return (
        <div className='mainVisualization'>
            <Canvas
                camera={{far: 10000}}
            >
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
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
        </div>
    )
}

export default Main
