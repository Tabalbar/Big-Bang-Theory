import React, {useRef, useState} from 'react'
import {Canvas, useFrame, useThree} from 'react-three-fiber'
import UpdateCameraPosition from "../HelperFunctions/UpdateCameraPosition";
import * as THREE from 'three'

function Sphere(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();

    // Set up state for the hovered and active state
    // const [hovered, setHover] = useState(false);
    // const [active, setActive] = useState(false);
    const camera = new THREE.PerspectiveCamera()
    useFrame(({clock, camera}) => {
        if(props.cameraMoving) {
            let tmpCameraMoving = UpdateCameraPosition(camera, props.cameraPosition, props.setCameraMoving)
            if(tmpCameraMoving){
                props.setCameraMoving(false)
            }
        }

        camera.updateProjectionMatrix()
    })
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (
        mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    ))

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={props.size}
            onClick={()=>props.updatePosition(props.indexNum)}
            // onPointerOver={(e) => setHover(true)}
            // onPointerOut={(e) => setHover(false)}
        >
            <sphereBufferGeometry/>
            <meshStandardMaterial attach='material' color={props.color}/>
        </mesh>
    )
}

export default Sphere
