import React from "react";
import {Canvas} from "react-three-fiber";
import _ from "lodash";
import {planetInfo} from "../PlanetData";
import Sphere from "../Objects/Sphere";

//todo define what the wrapper will look like in here
function Toolbar(
    {
        handleHomeButton
    }
){
    return (
        <>
            <div className='toolbar'>
                <button onClick={handleHomeButton}>Point Camera to Sun</button>
            <h1>This is where all the code will go to define the look of the toolbar</h1>
            {
                /*
                <button onClick=(functionThatWillFireOnClick)>This is a button example</button>
                 */
            }
            </div>
            <div className='miniMap'>
            <Canvas
                camera={{far: 10000, position: [0, 0, 400], fov: 75}}
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
                        />
                    ))
                }
                {/*{*/}
                {/*    cameraMoving ?*/}
                {/*        null*/}
                {/*        :*/}
                {/*        <OrbitControls/>*/}
                {/*}*/}
            </Canvas>
            </div>
        </>
    )
}

export default Toolbar
