import React, {useRef} from "react";
import {useFrame} from "react-three-fiber";

function CompassObject(props) {

    const mesh = useRef()

    useFrame(() => (
        mesh.current.position.x += props.cameraPosition.x)
    )


    return (
        <mesh
            {...props}
            ref={mesh}

        >
            <boxBufferGeometry attach='geometry' args={[1, 1, 1]}/>
        </mesh>
    )
}

export default CompassObject
