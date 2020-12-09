import React, {useRef} from "react";
import {useFrame} from "react-three-fiber";
import * as THREE from "three";

function CompassObject(props) {

    const mesh = useRef()

    // useFrame((state) => {
    //     console.log(props.miniMapCameraPosition === null ? 1: props.miniMapCameraPosition.z)
    //
    // });

    return (
        <mesh
            {...props}
            ref={mesh}
            // scale={[props.miniMapCameraPosition === null ? 1: props.miniMapCameraPosition.z,props.miniMapCameraPosition === null ? 1: props.miniMapCameraPosition.z,props.miniMapCameraPosition === null ? 1: props.miniMapCameraPosition.z]}
            scale={[1,1,1]}
        >
            {/*<boxBufferGeometry attach='geometry'/>*/}
            <arrowHelper
                args={[new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), 3, "blue", 1, .5]}/>
            <arrowHelper
                args={[new THREE.Vector3(1,0,0), new THREE.Vector3(0,0,0), 3, "red", 1, .5]}/>
            <arrowHelper
                args={[new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,0), 3, "green", 1, .5]}/>
        </mesh>
    )
}

export default CompassObject
