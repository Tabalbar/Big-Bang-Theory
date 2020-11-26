import React, {useRef} from "react";
import * as THREE from "three";
import {useFrame} from "react-three-fiber";

function Selected(props){


    const mesh = useRef();

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (
        mesh.current.rotation.y = mesh.current.rotation.y += .2
    ));

    return (
        <>
            <mesh
                {...props}
                ref={mesh}
                scale={props.size}
                // onPointerOver={(e) => setHover(true)}
                // onPointerOut={(e) => setHover(false)}
            >
                <ringBufferGeometry/>
                <meshStandardMaterial attach='material' color={props.color}/>
            </mesh>

            {/*<line ref={mesh} geometry={coneGeometry}>*/}
            {/*    <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={100}/>*/}
            {/*</line>*/}
        </>
    )
}

export default Selected
