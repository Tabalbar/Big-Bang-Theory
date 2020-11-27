import React, {useRef, useState} from "react";
import * as THREE from "three";
import {ReturnColor} from "../HelperFunctions/ReturnColor";
import {Html} from "drei";
import {Button, Icon} from "semantic-ui-react";
import starInfo from "../newStarData";

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

    const [hover, setHover] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const x = props.velocityDirection[0];
    const y = props.velocityDirection[1];
    const z = props.velocityDirection[2];


    return (
        <>
            <mesh
                {...props}
                ref={mesh}
                scale={hover ? [.3, .3, .3] : props.size}
                onClick={() => {
                    props.updateStarPosition(props.indexNum);
                    props.setActive(!props.active)
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

                            <div className='starDescription'>
                                <p>
                                    <strong style={{fontSize: 40}}>{props.starInfo.name}</strong><br/><br/>
                                    <b>Description:</b> {props.starInfo.funFact}<br/>
                                    <b>Ra: </b>{props.starInfo.ra} Deg<br/>
                                    <b>Dec: </b>{props.starInfo.dec} Deg <br/>
                                    <b>Distance: </b>{props.starInfo.distance} Light years<br/>
                                    <b>Temperature:</b> {props.starInfo.temperature} K<br/>
                                    <b>Brightness:</b> {props.starInfo.brightness}<br/>
                                    <b>Size:</b> {props.starInfo.realSize}<br/>
                                    <b>Color:</b> {props.starInfo.realColor}
                                </p>
                            </div>


                        </Html>
                        :
                        null
                }
                <Html scaleFactor={2}>
                    <div>
                        <Button color='blue' onClick={() => {
                            props.handleBookmark(props.indexNum);
                            setIsSelected(true)
                        }} icon>
                            {
                                isSelected ?
                                    <Icon color='yellow' name='star'/>
                                    :
                                    <Icon color='yellow' name='star outline'/>
                            }
                        </Button>
                    </div>
                </Html>


                <meshStandardMaterial attach='material' color={ReturnColor(props.temperature)}/>
            </mesh>
            <mesh
                {...props}
                ref={mesh}
                scale={[.1, .1, .1]}
            >
                <arrowHelper args={[new THREE.Vector3(x, y, z), new THREE.Vector3(0, 0, 0), 10, 'green', 1, 1]}/>
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
