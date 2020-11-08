import React from "react";
import {Canvas} from "react-three-fiber";
import _ from "lodash";
import {planetInfo} from "../PlanetData";
import Sphere from "../Objects/Sphere";

//todo define what the wrapper will look like in here
function Toolbar(
    {
        handleHomeButton,
        focusDescription
    }
) {
    return (
        <>
            <div className='toolbar'>
                <button onClick={handleHomeButton}>Point Camera to Sun</button>
                <h1>{focusDescription.name}</h1>
                <h3>Description: {focusDescription.funFact}</h3>
                <h3>{focusDescription.notable}</h3>
                <h3>Position: {focusDescription.realPosition}</h3>
                <h3>Temperature: {focusDescription.temperature}</h3>
                <h3>Brightness: {focusDescription.brightness}</h3>
                <h3>Size: {focusDescription.realSize}</h3>
                <h3>Color: {focusDescription.realColor}</h3>
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
