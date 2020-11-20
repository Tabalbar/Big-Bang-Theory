import React, {useRef, useState} from 'react'
import {Canvas, useFrame, useThree} from 'react-three-fiber'
import UpdateCameraPosition from "../HelperFunctions/UpdateCameraPosition";
import * as THREE from 'three'
import {Line} from "drei";
import Selected from "./Selected";
import {planetInfo} from "../PlanetData";

function Sphere(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();

    // Set up state for the hovered and active state
    // const [hovered, setHover] = useState(false);
    const camera = new THREE.PerspectiveCamera()
    useFrame(({clock, camera}) => {
        if (props.cameraMoving) {
            let tmpCameraMoving = UpdateCameraPosition(camera, props.cameraPosition, props.setCameraMoving)
            if (tmpCameraMoving) {
                props.setCameraMoving(false)

            }

        }

        camera.updateProjectionMatrix()
    })
    // Rotate mesh every frame, this is outside of React without overhead
    //     useFrame(() => (
    //         mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    //     ));

    const curve = new THREE.EllipseCurve(
        200, 0,
        props.position[0], props.position[0],
        0, 0,
        true,
        0
    );

    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <>
            <mesh
                {...props}
                ref={mesh}
                scale={props.size}
                onClick={() => {props.updatePosition(props.indexNum); props.setActive(!props.active)}}
                // onPointerOver={(e) => setHover(true)}
                // onPointerOut={(e) => setHover(false)}
            >
                <sphereBufferGeometry/>
                <meshStandardMaterial attach='material' color={props.color}/>
            </mesh>
            <line ref={mesh} geometry={geometry}>
                <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={100}/>
            </line>
        </>
    )
}

export default Sphere
