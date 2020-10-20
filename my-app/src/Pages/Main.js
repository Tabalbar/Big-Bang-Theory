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

    // const planetInfo = [
    //     {
    //         color: 'yellow',
    //         size: [400,400,400],
    //         position: [0,0,0]
    //     },
    //     {
    //         color: 'grey',
    //         size: [3.8,3.8,3.8],
    //         position: [380,0,0]
    //     },
    //     {
    //         color: 'brown',
    //         size: [9.5,9.5,9.5],
    //         position: [720,0,0]
    //     },
    //     {
    //         color: 'blue',
    //         size: [10,10,10],
    //         position: [1000,0,0]
    //     },
    //     {
    //         color: 'red',
    //         size: [5.3,5.3,5.3],
    //         position: [1500,0,0]
    //     },
    //     {
    //         color: 'brown',
    //         size: [110,110,110],
    //         position: [5200,0,0]
    //     },
    //     {
    //         color: 'brown',
    //         size: [90.4,90.4,90.4],
    //         position: [9500,0,0]
    //     },
    //     {
    //         color: 'green',
    //         size: [40,40,40],
    //         position: [19000,0,0]
    //     },
    //     {
    //         color: 'blue',
    //         size: [38,38,38],
    //         position: [30000,0,0]
    //     }
    // ];

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
                {/*<Box position={[-1.2, 0, 0]} />*/}
                {/*<Box position={[1.2, 0, 0]} />*/}
                <OrbitControls/>
            </Canvas>
        </div>
    )
}

export default Main
