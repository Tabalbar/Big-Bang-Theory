import React, {useRef} from "react";
import * as THREE from "three";
import {useFrame} from "react-three-fiber";
import UpdateCameraPosition from "../HelperFunctions/UpdateCameraPosition";
import StarArrow from "./StarArrow";
import Pin from "./Pin";

function Star(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();

    // Set up state for the hovered and active state
    // const [hovered, setHover] = useState(false);
    // const [active, setActive] = useState(false);
    // Rotate mesh every frame, this is outside of React without overhead
    // useFrame(() => (
    //     mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    // ))
    const x = props.velocityDirection[0];
    const y = props.velocityDirection[1];
    const z = props.velocityDirection[2];
    return (
        <>
            <mesh
                {...props}
                ref={mesh}
                scale={props.size}
                onClick={() => {props.updateStarPosition(props.indexNum); props.setActive(!props.active)}}
                // onPointerOver={(e) => setHover(true)}
                // onPointerOut={(e) => setHover(false)}
            >
                <sphereBufferGeometry/>
                <meshStandardMaterial attach='material' color={props.color}/>
            </mesh>
            <mesh
                {...props}
                ref={mesh}
                scale={[30, 30, 30]}
            >
                <arrowHelper args={[new THREE.Vector3(x, y, z), new THREE.Vector3(0, 0, 0), 300, '0xff0000', 50, 50]}/>
                <meshStandardMaterial attach='material' color={props.color}/>
            </mesh>
            {/*<StarArrow*/}
            {/*    position={new THREE.Vector3(props.position[0],props.position[1],props.position[2])}*/}
            {/*    velocityDirection={new THREE.Vector3(0,0,0)}*/}
            {/*/>*/}
        </>
    )
}

export default Star
