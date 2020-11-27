import React, {useRef, useState} from 'react'
import {Canvas, useFrame, useThree} from 'react-three-fiber'
import UpdateCameraPosition from "../HelperFunctions/UpdateCameraPosition";
import * as THREE from 'three'
import {Html} from "drei";

function Sphere(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();

    // Set up state for the hovered and active state
    // const [hovered, setHover] = useState(false);
    const camera = new THREE.PerspectiveCamera()
    const [hover, setHover] = useState(false);
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
                onPointerOver={(e) => setHover(true)}
                onPointerOut={(e) => setHover(false)}
            >
                <sphereBufferGeometry/>
                {
                    hover ?
                        <Html scaleFactor={3}>
                            <div className='focusedDescription'>
                                <p>
                                    <strong style={{fontSize: 40}}>{props.focusDescription.name}</strong><br/><br/>
                                    <b>Description:</b> {props.focusDescription.funFact}<br/>
                                    <b>Ra: </b>{props.focusDescription.ra} Deg<br/>
                                    <b>Dec: </b>{props.focusDescription.dec} Deg <br/>
                                    <b>Distance: </b>{props.focusDescription.distance} Light years<br/>
                                    <b>Temperature:</b> {props.focusDescription.temperature} K<br/>
                                    <b>Brightness:</b> {props.focusDescription.brightness}<br/>
                                    <b>Size:</b> {props.focusDescription.realSize}<br/>
                                    <b>Color:</b> {props.focusDescription.realColor}
                                </p>
                            </div>


                        </Html>
                        :
                        null
                }
                <meshStandardMaterial attach='material' color={props.color}/>
            </mesh>
            {/*<line ref={mesh} geometry={geometry}>*/}
            {/*    <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={100}/>*/}
            {/*</line>*/}
        </>
    )
}

export default Sphere
