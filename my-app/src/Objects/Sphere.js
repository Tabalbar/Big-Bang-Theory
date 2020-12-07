import React, {useRef, useState} from 'react'
import {Canvas, useFrame, useThree} from 'react-three-fiber'
import UpdateCameraPosition from "../HelperFunctions/UpdateCameraPosition";
import * as THREE from 'three'
import {Html} from "drei";
import _ from "lodash";

function Sphere(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef();

    // Set up state for the hovered and active state
    // const [hovered, setHover] = useState(false);
    const camera = new THREE.PerspectiveCamera()
    const [hover, setHover] = useState(false);
    const [cameraFocused, setCameraFocused] = useState(false);
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
    const x = props.velocityDirection[0];
    const y = props.velocityDirection[1];
    const z = props.velocityDirection[2];
    return (
        <>
            <mesh
                {...props}
                ref={mesh}
                scale={props.size}
                onClick={() => {
                    props.updatePosition(props.indexNum);
                    props.setActive(!props.active);
                    setCameraFocused(true);
                }}
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
                                    <b>Ra: </b>{props.focusDescription.ra} Deg<br/>
                                    <b>Dec: </b>{props.focusDescription.dec} Deg <br/>
                                    <b>Distance: </b>{props.focusDescription.distance} Light year(s)<br/>
                                    <b>Temperature:</b> {props.focusDescription.temperature} K<br/>
                                    <b>Color:</b> {props.focusDescription.realColor}<br/>
                                    <b>Velocity Magnitude:</b> {props.velMag} Km/s <br/>
                                </p>
                            </div>
                            {
                                cameraFocused ?
                                    <div className='starDescription'>
                                        <p>
                                            <strong style={{fontSize: 40}}>{props.name}</strong><br/><br/>
                                            <b>Ra: </b>{props.ra} Deg<br/>
                                            <b>Dec: </b>{props.dec} Deg <br/>
                                            <b>Distance: </b>{props.distance} Light year(s)<br/>
                                            <b>Temperature:</b> {props.temperature} K<br/>
                                            <b>Color:</b> {props.realColor}<br/>
                                            <b>Velocity Magnitude:</b> {props.velMag} Km/s <br/>
                                        </p>
                                    </div>
                                    :
                                    null
                            }
                        </Html>
                        :
                        null
                }
                <meshStandardMaterial attach='material' color={props.color}/>
            </mesh>
            <mesh
                {...props}
                ref={mesh}
                scale={[.1, .1, .1]}
            >
                {
                    _.times((3), i => (
                        <arrowHelper
                            args={[new THREE.Vector3(props.velocityDirection[0],props.velocityDirection[1],props.velocityDirection[2]), new THREE.Vector3(0, Math.sign(props.velocityDirection[1])*2, 0), (.45*i*2), "green", 1, 1]}/>
                    ))
                }
                {/*<arrowHelper*/}
                {/*    args={[new THREE.Vector3(x, y, z), new THREE.Vector3(0, 0, 0), (0.45*10), 'green', 1, 1]}/>*/}
                <meshStandardMaterial attach='material' color={'green'}/>
            </mesh>
            {/*<line ref={mesh} geometry={geometry}>*/}
            {/*    <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={100}/>*/}
            {/*</line>*/}
        </>
    )
}

export default Sphere
